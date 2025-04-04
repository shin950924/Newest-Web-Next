import React, { FC, memo } from "react";
import GridItem from "../grid/GridItem";
import { FeedGridItemProps } from "../../../types";

export const FeedGridItem: FC<FeedGridItemProps> = memo(({ item }) => {
  const firstImageUri =
    item.type === "post" ? item.media_urls?.[0] : item.articles?.[0]?.images;

  return <GridItem data={item} source={firstImageUri} isTextOverlay={false} />;
});

FeedGridItem.displayName = "FeedGridItem";
