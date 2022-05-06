import SideNav from "../elements/SideNav"

function Dashboard() {
    return (
        <div className="flex">
            <SideNav />
            <div className="flex-1 min-h-screen bg-gray-200">
                <div class="w-full max-w-screen-xl py-6 px-6">
                    <div class="mb-12">
                        <h2 class="text-3xl font-bold mb-4">Overview</h2>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;