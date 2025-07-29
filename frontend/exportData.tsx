
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';

const ExportDate = () => {

    const arr = [
        { id: 1, name: "reebok", price: 200, color: "blue" },
        { id: 2, name: "nike", price: 200, color: "red" },
        { id: 3, name: "addidas", price: 200, color: "white" },
        { id: 4, name: "puma", price: 500, color: "black" },
        { id: 5, name: "canvas", price: 400, color: "brown" }
    ]

    function exportDate() {
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(arr)

        XLSX.utils.book_append_sheet(wb, ws, "file");
        XLSX.writeFile(wb, "file.xlsx")

    }
    return (
        <>
            <h1>exportData</h1>
            <button onClick={exportDate}>export</button>
        </>
    )
}

export default ExportDate