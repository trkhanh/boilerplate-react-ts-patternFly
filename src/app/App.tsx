import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageProps,
  SkipToContent
} from '@patternfly/react-core';
import { Header, NavSidebar, MainPage } from '../components';

export const App: React.SFC<PageProps> = ({...props}) => {
   const PageBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbItem>Section Home</BreadcrumbItem>
      <BreadcrumbItem to="#" onClick={e => e.preventDefault()}>
        Section Title
      </BreadcrumbItem>
      <BreadcrumbItem to="#" onClick={e => e.preventDefault()}>
        Section Title
      </BreadcrumbItem>
      <BreadcrumbItem to="#" onClick={e => e.preventDefault()} isActive>
        Section Landing
      </BreadcrumbItem>
    </Breadcrumb>
  );

  const PageSkipToContent = (
    <SkipToContent href="#main-content-page-layout-expandable-nav">Skip to Content</SkipToContent>
  );

  return (
    <Page
      style={{ height: '100vh' }}
      header={<Header />}
      sidebar={<NavSidebar />}
      isManagedSidebar
      skipToContent={PageSkipToContent}
      breadcrumb={PageBreadcrumb}
    >
      <MainPage />
    </Page>
  );
};
