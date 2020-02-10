import React from 'react';

import {
  Card,
  CardBody,
  Gallery,
  GalleryItem,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text
} from '@patternfly/react-core';

export const MainPage = () => (
  <React.Fragment>
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component="h1">Main Title</Text>
        <Text component="p">
          Body text should be Overpass Regular at 16px. It should have leading of 24px because <br />
          of it’s relative line height of 1.5.
        </Text>
      </TextContent>
    </PageSection>
    <PageSection isFilled>
      <Gallery gutter="md">
        {Array.apply(0, Array(10)).map((x, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>This is a card</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  </React.Fragment>
);
