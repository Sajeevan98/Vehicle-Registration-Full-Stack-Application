import RegistryList from "../components/RegistryList";
import SubTitle from "../components/SubTitle";

function Registries() {
    const title = "Vehicle Owners";

    return (
        <>
            <SubTitle title={title} />
            <div className="px-5 my-5">
                <RegistryList />
            </div>
        </>
    );
}

export default Registries;
