import React from 'react';

import { CodeIcon, CogIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Nav,
  NavExpandable,
  NavItem,
  NavItemSeparator,
  NavList,
  PageSidebar
} from '@patternfly/react-core';

const defaultLink = 'http://google.com';

const perspectives = [
  {
    id: 'admin',
    title: 'Admin Console',
    description: 'Cluster: AWS-us-west-1',
    activeGroup: 'admin-home',
    activeItem: 'admin-projects',
    icon: <CogIcon className="app-launcher-launch-item__image" />
  },
  {
    id: 'dev',
    title: 'Developer Console',
    description: 'Cluster: AWS-us-west-1',
    activeItem: 'dev-topology',
    icon: <CodeIcon className="app-launcher-launch-item__image" />
  }
];


export class NavSidebar extends React.Component {
  state = {
    isPerspectiveDropdownOpen: false,
    perspective: perspectives[0],
    activeGroup: perspectives[0].activeGroup,
    activeItem: perspectives[0].activeItem
  };

  onTogglePerspectiveDropdown = isPerspectiveDropdownOpen => {
    this.setState({
      isPerspectiveDropdownOpen
    });
  };

  onNavSelect = result => {
    if (result.itemId && result.itemId.endsWith('-link')) {
      return;
    }

    this.setState({
      activeItem: result.itemId,
      activeGroup: result.groupId
    });
  };

  setPerspective = (e, perspective) => {
    e.preventDefault();

    this.setState({
      perspective,
      activeItem: perspective.activeItem,
      isPerspectiveDropdownOpen: false
    });
  };

  renderNavItemLink = (title, href) => (
    <NavItem title={title} key={title}>
      <a href={href} className="external-link-nav-item" target="_blank" rel="noopener noreferrer">
        {title}
        <ExternalLinkAltIcon className="pf-u-ml-md external-link-nav-item__icon" />
      </a>
    </NavItem>
  );

  getDevNavItems = () => {
    const { activeItem, activeGroup } = this.state;

    return [
      <NavItem title="Topology" key="dev-topology" groupId="dev-topology" isActive={activeItem === 'dev-topology'}>
        Topology
      </NavItem>,
      <NavItem title="Builds" key="dev-builds" groupId="dev-builds" isActive={activeItem === 'dev-builds'}>
        Builds
      </NavItem>,
      <NavExpandable
        title="Advanced"
        key="dev-advanced"
        groupId="dev-advanced"
        isActive={activeGroup === 'dev-advanced'}
      >
        <NavItem groupId="dev-advanced" itemId="dev-projects" isActive={activeItem === 'dev-projects'}>
          Projects
        </NavItem>
        <NavItem groupId="dev-advanced" itemId="dev-status" isActive={activeItem === 'dev-status'}>
          Status
        </NavItem>
        <NavItem groupId="dev-advanced" itemId="dev-events" isActive={activeItem === 'dev-events'}>
          Events
        </NavItem>
        <NavItem groupId="dev-advanced" itemId="dev-search" isActive={activeItem === 'dev-search'}>
          Search
        </NavItem>
      </NavExpandable>
    ];
  };

  getAdminNavItems = () => {
    const { activeItem, activeGroup } = this.state;

    return [
      <NavExpandable
        title="Home"
        key="admin-home"
        groupId="admin-home"
        isActive={activeGroup === 'admin-home'}
        isExpanded
      >
        <NavItem groupId="admin-home" itemId="admin-projects" isActive={activeItem === 'admin-projects'}>
          Projects
        </NavItem>
        <NavItem groupId="admin-home" itemId="admin-status" isActive={activeItem === 'admin-status'}>
          Status
        </NavItem>
        <NavItem groupId="admin-home" itemId="admin-search" isActive={activeItem === 'admin-search'}>
          Search
        </NavItem>
        <NavItem groupId="admin-home" itemId="admin-events" isActive={activeItem === 'admin-events'}>
          Events
        </NavItem>
      </NavExpandable>,
      <NavExpandable
        title="Catalog"
        key="admin-catalog"
        groupId="admin-catalog"
        isActive={activeGroup === 'admin-catalog'}
      >
        <NavItem groupId="admin-catalog" itemId="admin-dev-catalog" isActive={activeItem === 'admin-dev-catalog'}>
          Developer Catalog
        </NavItem>
        <NavItem groupId="admin-catalog" itemId="admin-operators" isActive={activeItem === 'admin-operators'}>
          Installed Operators
        </NavItem>
        <NavItem groupId="admin-catalog" itemId="admin-op-hub" isActive={activeItem === 'admin-op-hub'}>
          OperatorHub
        </NavItem>
        <NavItem groupId="admin-catalog" itemId="admin-op-management" isActive={activeItem === 'admin-op-management'}>
          Operator Management
        </NavItem>
      </NavExpandable>,
      <NavExpandable
        title="Workloads"
        key="admin-workloads"
        groupId="admin-workloads"
        isActive={activeGroup === 'admin-workloads'}
      >
        <NavItem title="Pods" groupId="admin-workloads" itemId="admin-pods" isActive={activeItem === 'admin-pods'}>
          Pods
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-deployments" isActive={activeItem === 'admin-deployments'}>
          Deployments
        </NavItem>
        <NavItem
          groupId="admin-workloads"
          itemId="admin-deployment-configs"
          isActive={activeItem === 'admin-deployment-configs'}
        >
          Deployment Configs
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-stateful-sets" isActive={activeItem === 'admin-stateful-sets'}>
          Stateful Sets
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-secrets" isActive={activeItem === 'admin-secrets'}>
          Secrets
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-config-maps" isActive={activeItem === 'admin-config-maps'}>
          Config Maps
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-cron-jobs" isActive={activeItem === 'admin-cron-jobs'}>
          Cron Jobs
        </NavItem>
        <NavItem title="Jobs" groupId="admin-workloads" itemId="admin-jobs" isActive={activeItem === 'admin-jobs'}>
          Jobs
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-daemon-sets" isActive={activeItem === 'admin-daemon-sets'}>
          Daemon Sets
        </NavItem>
        <NavItem groupId="admin-workloads" itemId="admin-replica-sets" isActive={activeItem === 'admin-replica-sets'}>
          Replica Sets
        </NavItem>
        <NavItem
          groupId="admin-workloads"
          itemId="admin-replication-controllers"
          isActive={activeItem === 'admin-replication-controllers'}
        >
          Replication Controllers
        </NavItem>
        <NavItem
          groupId="admin-workloads"
          itemId="admin-horizontal-pod-autoscalers"
          isActive={activeItem === 'admin-horizontal-pod-autoscalers'}
        >
          Horizontal Pod Autoscalers
        </NavItem>
      </NavExpandable>,
      <NavExpandable
        title="Networking"
        key="admin-networking"
        groupId="admin-networking"
        isActive={activeGroup === 'admin-networking'}
      >
        <NavItem groupId="admin-networking" itemId="admin-services" isActive={activeItem === 'admin-services'}>
          Services
        </NavItem>
        <NavItem groupId="admin-networking" itemId="admin-routes" isActive={activeItem === 'admin-routes'}>
          Routes
        </NavItem>
        <NavItem groupId="admin-networking" itemId="admin-ingres" isActive={activeItem === 'admin-ingres'}>
          Ingres
        </NavItem>
        <NavItem groupId="admin-networking" itemId="admin-policies" isActive={activeItem === 'admin-policies'}>
          Network Policies
        </NavItem>
      </NavExpandable>,
      <NavExpandable title="Builds" key="admin-builds" groupId="admin-builds" isActive={activeGroup === 'admin-builds'}>
        <NavItem groupId="admin-builds" itemId="admin-build-configs" isActive={activeItem === 'admin-build-configs'}>
          Build Configs
        </NavItem>
        <NavItem groupId="admin-builds" itemId="admin-builds" isActive={activeItem === 'admin-builds'}>
          Builds
        </NavItem>
        <NavItem groupId="admin-builds" itemId="admin-image-streams" isActive={activeItem === 'admin-image-streams'}>
          Image Streams
        </NavItem>
      </NavExpandable>,
      <NavExpandable
        title="Monitoring"
        key="admin-monitoring"
        groupId="admin-monitoring"
        isActive={activeGroup === 'admin-monitoring'}
      >
        <NavItem groupId="admin-monitoring" itemId="admin-alerts" isActive={activeItem === 'admin-alerts'}>
          Alerts
        </NavItem>
        <NavItem groupId="admin-monitoring" itemId="admin-silences" isActive={activeItem === 'admin-silences'}>
          Silences
        </NavItem>
        {this.renderNavItemLink('Metrics', defaultLink)}
        {this.renderNavItemLink('Dashboards', defaultLink)}
      </NavExpandable>,
      <NavExpandable
        title="Compute"
        key="admin-compute"
        groupId="admin-compute"
        isActive={activeGroup === 'admin-compute'}
      >
        <NavItem groupId="admin-compute" itemId="admin-nodes" isActive={activeItem === 'admin-nodes'}>
          Nodes
        </NavItem>
        <NavItem groupId="admin-compute" itemId="admin-machines" isActive={activeItem === 'admin-machines'}>
          Machines
        </NavItem>
        <NavItem groupId="admin-compute" itemId="admin-machine-sets" isActive={activeItem === 'admin-machine-sets'}>
          Machine Sets
        </NavItem>
        <NavItemSeparator />
        <NavItem
          groupId="admin-compute"
          itemId="admin-machine-configs"
          isActive={activeItem === 'admin-machine-configs'}
        >
          Machine Configs
        </NavItem>
        <NavItem
          groupId="admin-compute"
          itemId="admin-machine-config-pods"
          isActive={activeItem === 'admin-machine-config-pods'}
        >
          Machine Config Pods
        </NavItem>
      </NavExpandable>,
      <NavExpandable
        title="Administration"
        key="admin-admin"
        groupId="admin-admin"
        isActive={activeGroup === 'admin-admin'}
      >
        <NavItem
          groupId="admin-admin"
          itemId="admin-cluster-settings"
          isActive={activeItem === 'admin-cluster-settings'}
        >
          Cluster Settings
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-namespaces" isActive={activeItem === 'admin-namespaces'}>
          Namespaces
        </NavItem>
        <NavItem
          groupId="admin-admin"
          itemId="admin-service-accounts"
          isActive={activeItem === 'admin-service-accounts'}
        >
          Service Accounts
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-roles" isActive={activeItem === 'admin-roles'}>
          Roles
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-role-bindings" isActive={activeItem === 'admin-role-bindings'}>
          Role Bindings
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-resource-quotas" isActive={activeItem === 'admin-resource-quotas'}>
          Resource Quotas
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-limit-ranges" isActive={activeItem === 'admin-limit-ranges'}>
          Limit Ranges
        </NavItem>
        <NavItem groupId="admin-admin" itemId="admin-crds" isActive={activeItem === 'admin-crds'}>
          Custom Resource Definitions
        </NavItem>
      </NavExpandable>
    ];
  };

  getNavItems = () => {
    const { perspective, isPerspectiveDropdownOpen } = this.state;

    let navItems;

    if (perspective.id === 'dev') {
      navItems = this.getDevNavItems();
    } else if (perspective.id === 'admin') {
      navItems = this.getAdminNavItems();
    }

    const toggle = (
      <DropdownToggle
        isOpen={isPerspectiveDropdownOpen}
        onToggle={this.onTogglePerspectiveDropdown}
        style={{ width: '100%' }}
      >
        <div className="perspective-switcher-toggle">
          {perspective.icon && perspective.icon}
          <h1>{perspective.title}</h1>
        </div>
        <p className="perspective-description">{perspective.description}</p>
      </DropdownToggle>
    );

    const dropdownItems = perspectives.map(nextPerspective => {
      const onItemClick = (e: any) => {
        this.setPerspective(e, nextPerspective);
      };
      return (
        <DropdownItem
          key={nextPerspective.id}
          onClick={onItemClick as any}
          isHovered={nextPerspective.id === perspective.id}
        >
          <button className="perspective-dropdown__item pf-c-dropdown__menu-item">
            {nextPerspective.icon && nextPerspective.icon}
            <h1>{nextPerspective.title}</h1>
          </button>
        </DropdownItem>
      );
    });

    return (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavList>
          <Dropdown
            className="perspective-switcher"
            dropdownItems={dropdownItems}
            isOpen={isPerspectiveDropdownOpen}
            toggle={toggle}
            style={{ width: '100%' }}
          />
          {navItems}
        </NavList>
      </Nav>
    );
  };

  render() {
    return <PageSidebar className="perspective-sidebar" nav={this.getNavItems()} />;
  }
}

export default NavSidebar;
