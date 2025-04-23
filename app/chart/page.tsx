import DonutChart from "@/app/ui/achart";
import LineChart from "../ui/growChart";

export default function Donutchart(){
    return(
        <section>
            <div className="flex flex-col px-6 mt-8 max-w-full min-w-sm">
                <DonutChart />
                <LineChart />
            </div>

        </section>

    )
}