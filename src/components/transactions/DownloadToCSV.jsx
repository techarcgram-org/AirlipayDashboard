import React from "react";

const DownloadCSV = ({ data, fileName }) => {
  //   const convertToCSV = (objArray) => {
  //     const array =
  //       typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  //     let str = "";

  //     for (let i = 0; i < array.length; i++) {
  //       let line = "";
  //       for (let index in array[i]) {
  //         if (line !== "") line += ",";

  //         line += array[i][index];
  //       }
  //       str += line + "\r\n";
  //     }
  //     return str;
  //   };
  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    // Extract headers
    const headers = Object.keys(array[0]).join(",") + "\r\n";
    str += headers;

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";

        let value = array[i][index];

        // Check if value is an array
        if (Array.isArray(value)) {
          // Convert array to a string with a delimiter (e.g., a semicolon or space)
          value = `"${value.join(";")}"`;
        }

        line += value;
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="px-4 py-2 bg-[#063b87] text-white font-semibold rounded shadow-md"
    >
      Download CSV
    </button>
  );
};

export default DownloadCSV;
