//@ts-nocheck
// TODO: Fix type errors. Code works, but types are not confiured correctly

import { ComponentProps, FC, PropsWithChildren, ReactElement, useCallback } from "react";
import { Card, Flex, Spinner } from "@sanity/ui";
import { useClient } from "sanity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVerticalIcon } from "lucide-react";
import { cn } from "~/app/_utils/cn";
import { apiVersion } from "../config";
import { Reorder, useDragControls } from "framer-motion";

type DocumentItem = { ID: string; order: number };

type DocumentOrderInputProps<Document> = {
  query: string;
  getDocumentID: (document: Document) => string;
  getDocumentOrder: (document: Document) => number;
  renderItem: (document: Document) => ReactElement;
};

export const DocumentOrderInput = <QueryResult extends Array<{}>>(
  props: DocumentOrderInputProps<QueryResult[number]>,
): ReactElement => {
  const queryClient = useQueryClient();
  const sanityClient = useClient({ apiVersion });

  const documentsQuery = useQuery({
    queryKey: [props.query],
    queryFn: () => sanityClient.fetch<QueryResult>(props.query),
  });

  const documentsMutation = useMutation({
    mutationFn: async (updates: DocumentItem[]) => {
      return await sanityClient
        .transaction(updates.map((update) => ({ patch: { id: update.ID, set: { order: update.order } } }))) // order would need to be customizable for a more generic usage of this component
        .commit();
    },
    onSuccess: () => documentsQuery.refetch(),
  });

  const handleReorder = useCallback<ComponentProps<typeof Reorder.Group<string>>["onReorder"]>(
    (newOrder) => {
      if (!documentsQuery.data) return;
      const updatedData = newOrder.map(
        (documentID) => documentsQuery.data!.find((document) => props.getDocumentID(document) === documentID)!,
      );
      queryClient.setQueryData<QueryResult>([props.query], updatedData);
    },
    [queryClient, documentsQuery, props.query, props.getDocumentID],
  );

  const handleDragEnd = useCallback<NonNullable<ReorderListItemProps["onDragEnd"]>>(() => {
    if (!documentsQuery.data) return;
    const changedItems = documentsQuery.data.reduce((changedItems, document, newIndex) => {
      const documentID = props.getDocumentID(document);
      const documentOrder = props.getDocumentOrder(document);
      if (documentOrder === newIndex) return changedItems;
      changedItems.push({ ID: documentID, order: newIndex });
      return changedItems;
    }, [] as DocumentItem[]);

    if (!changedItems.length) return;

    documentsMutation.mutate(changedItems);
  }, [documentsQuery, documentsMutation, props.getDocumentID, props.getDocumentOrder]);

  if (documentsQuery.isLoading) {
    return (
      <Card shadow={1} radius={2} padding={3} className="text-center">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card>
      <Reorder.Group
        values={documentsQuery.data?.map(props.getDocumentID) || []}
        onReorder={handleReorder}
        axis="y"
        className={cn("flex flex-col gap-2 transition-opacity [&:has(>_:active)]:select-none", {
          "pointer-events-none opacity-30": documentsMutation.isPending || documentsQuery.isFetching,
        })}
      >
        {documentsQuery.data?.map((document) => (
          <ReorderListItem
            key={props.getDocumentID(document)}
            value={props.getDocumentID(document)}
            onDragEnd={handleDragEnd}
          >
            {props.renderItem(document)}
          </ReorderListItem>
        ))}
      </Reorder.Group>
    </Card>
  );
};

type ReorderListItemProps = {
  value: string;
  onDragEnd?: ComponentProps<typeof Reorder.Item>["onDragEnd"];
};

const ReorderListItem: FC<PropsWithChildren<ReorderListItemProps>> = (props) => {
  const controls = useDragControls();

  return (
    <Reorder.Item value={props.value} dragListener={false} dragControls={controls} onDragEnd={props.onDragEnd}>
      <Card padding={1} radius={3} shadow={1}>
        <Flex align="center" gap={2}>
          <div
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab rounded px-1 py-2 transition-colors hover:bg-neutral-100/10 active:cursor-grabbing"
          >
            <GripVerticalIcon />
          </div>
          {props.children}
        </Flex>
      </Card>
    </Reorder.Item>
  );
};
