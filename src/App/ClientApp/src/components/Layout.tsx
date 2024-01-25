import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'
import { ReactPortal } from 'react'

export const Layout = (props: Partial<ReactPortal>) =>
  <div>
    <NavMenu />
    <Container tag="main">
      {props.children}
    </Container>
  </div>
