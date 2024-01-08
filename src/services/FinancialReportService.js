import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const FinancialReportService = {
    getFinancialReportData,
    updateFinancialReportData,
    getFinancialReport
}

async function getFinancialReportData() {
    return await HTTP.get("/api/financial-report/data", getHeaders()).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error.response)
    });
}

async function updateFinancialReportData(reportData) {
    return await HTTP.put("/api/financial-report/data", reportData, getHeaders()).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error.response)
    });
}

async function getFinancialReport() {
    return await HTTP.get("/api/financial-report", getHeaders()).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error.response)
    });
}



