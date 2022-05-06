import classes from './Layout.module.css'
import SideNav from '../../elements/SideNav'

function Layout(props) {
    return <div>
        <SideNav />
        <main className={classes.main}>{props.children}</main>
    </div>
}

export default Layout;