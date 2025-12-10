import SubTitle from "../components/SubTitle";
import VehicleList from "../components/VehicleList";

function Home() {
    const title = "Vehicle Registration System";

    return (
        <>
            <SubTitle title={title} />
            <div className="px-4">
                <VehicleList />
            </div>
        </>
    );
}

export default Home;
