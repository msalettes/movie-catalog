import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './AppLayout.module.scss';

export default function AppLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <header
        role="banner"
        className={classnames(styles.header, 'flex-row', 'justify-content-between', 'py-2', 'px-4')}
      >
        <Nav defaultActiveKey="/Movies" as="ul" role="navigation">
          <Nav.Item as="li">
            <Nav.Link eventKey={1} as={Link} to="/">
              Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey={2} as={Link} to="/series">
              Series
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Logo className={styles.logo} />
      </header>
      <main role="main">{children}</main>
    </>
  );
}
