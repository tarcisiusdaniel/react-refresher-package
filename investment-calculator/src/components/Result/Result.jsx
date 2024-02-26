import { formatter } from "../../util/investment";

export default function Result({tableResult}) {
    let currTotalInterest = 0;
    return (
        <table id = "result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableResult.map((rowResult, index) => {
                        currTotalInterest += rowResult.interest;
                        return (
                            <tr key = {index}>
                                <td>{rowResult.year}</td> 
                                <td>{formatter.format(rowResult.valueEndOfYear)}</td>
                                <td>{formatter.format(rowResult.interest)}</td>
                                <td>{formatter.format(currTotalInterest)}</td>
                                <td>{formatter.format(rowResult.valueEndOfYear - currTotalInterest)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}