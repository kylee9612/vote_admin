import "./Admin.css"
import DoughnutChart from "./box/DoughnutChart";

function admin() {

    return (
        <div className={'main-index'}>
            <DoughnutChart data={[86, 67, 91, 85, 76, 86, 79]} id={1} />
            <DoughnutChart data={[86, 67, 91, 85, 76, 86, 79]} id={2} />
            <DoughnutChart data={[86, 67, 91, 85, 76, 86, 79]} id={3} />
            <DoughnutChart data={[86, 67, 91, 85, 76, 86, 79]} id={4} />
        </div>
    )
}

export default admin