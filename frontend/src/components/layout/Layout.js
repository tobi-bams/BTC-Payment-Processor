import SideNav from '../../elements/SideNav'

function Layout(props) {
    return <div className="flex">
        <SideNav />
        <div className="flex-1 min-h-screen bg-gray-200">
            <div className="w-full max-w-screen-xl py-6 px-6">
                {props.children}
            </div>
        </div>
    </div>
}

export default Layout;