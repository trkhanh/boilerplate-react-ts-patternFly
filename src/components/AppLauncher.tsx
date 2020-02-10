import React from 'react';

import { ExternalLinkAltIcon } from '@patternfly/react-icons';

import {
  ApplicationLauncher,
  DropdownItem,
  DropdownGroup,
  DropdownSeparator,
  Tooltip
} from '@patternfly/react-core';

import threeScaleLogo from '../images/3scale.svg';
import mongodbLogo from '../images/mongodb.svg';
import openshiftLogo from '../images/openshift.svg';
import shadownmanLogo from '../images/shadowman.svg';
import awsLogo from '../images/aws.png';
import kafkaLogo from '../images/kafka.svg';
import defaultLogo from '../images/default-logo.svg';

const defaultLink = 'http://google.com';

const externalApplicationCategories = [
  {
    id: 'multi-cluster-manager',
    title: 'Multi-Cluster Manager',
    image: openshiftLogo,
    link: defaultLink
  },
  {
    title: ' Applications',
    applications: [
      {
        title: 'OpenShift Logging',
        link: defaultLink,
        image: openshiftLogo
      },
      {
        title: 'OpenShift Services Mesh',
        link: defaultLink,
        image: openshiftLogo
      },
      {
        title: ' 3 Scale',
        link: defaultLink,
        image: threeScaleLogo
      },
      {
        title: ' Fuse',
        link: defaultLink,
        image: shadownmanLogo
      },
      {
        title: 'SkyDive',
        link: defaultLink,
        image: defaultLogo
      }
    ]
  },
  {
    title: '3rd Party Applications',
    applications: [
      {
        title: 'AWS',
        link: defaultLink,
        image: awsLogo
      },
      {
        title: 'Kafka',
        link: defaultLink,
        image: kafkaLogo
      },
      {
        title: 'Mongo',
        link: defaultLink,
        image: mongodbLogo
      }
    ]
  },
  {
    title: 'Customer Applications',
    applications: [
      {
        title: 'Application 1',
        link: defaultLink,
        image: defaultLogo
      },
      {
        title: 'Application 2',
        link: defaultLink,
        image: defaultLogo
      },
      {
        title: 'Application 3',
        link: defaultLink,
        image: defaultLogo
      }
    ]
  }
];

export class AppLauncher extends React.Component {
  state = {
    isAppLauncherOpen: false
  };

  onAppLauncherToggle = () => {
    this.setState({
      isAppLauncherOpen: !this.state.isAppLauncherOpen
    });
  };

  onLinkAndLaunch = () => {
    this.setState({ isAppLauncherOpen: false });
  };

  renderAppLauncherLink = (title, image, href, tooltip = null) => {
    const dropdownItem = (
      <DropdownItem key={title} onClick={this.onLinkAndLaunch}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="pf-c-nav__link app-launcher-launch-item"
        >
          <img src={image} alt="" className="app-launcher-launch-item__image" />
          {title}
          <ExternalLinkAltIcon className="pf-u-ml-md external-link-nav-item__icon" />
        </a>
      </DropdownItem>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{dropdownItem}</Tooltip>;
    }

    return dropdownItem;
  };

  renderApplicationLauncherItems = () => {
    const { isAppLauncherOpen } = this.state;

    const launcherItems:any[] = [];

    if (!isAppLauncherOpen) {
      return launcherItems;
    }

    externalApplicationCategories.forEach((category, index) => {
      if (index > 0 && (category.applications || externalApplicationCategories[index - 1].applications)) {
        launcherItems.push(<DropdownSeparator key={`separator-${index}`} />);
      }

      if (!category.applications) {
        launcherItems.push(this.renderAppLauncherLink(category.title, category.image, defaultLink));
      } else {
        launcherItems.push(
          <DropdownGroup key={category.title} label={category.title} className="app-launcher-group">
            {category.applications.map(application =>
              this.renderAppLauncherLink(application.title, application.image, defaultLink)
            )}
          </DropdownGroup>
        );
      }
    });

    return launcherItems;
  };

  render() {
    const { isAppLauncherOpen } = this.state;

    return (
      <ApplicationLauncher
        id="app-launcher"
        isOpen={isAppLauncherOpen}
        onToggle={this.onAppLauncherToggle}
        dropdownItems={this.renderApplicationLauncherItems()}
      />
    );
  }
}
