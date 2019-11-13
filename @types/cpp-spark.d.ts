export interface ValidationError {
    info: string,
    file_path: string,
    details: string,
    line_number: number
}

export interface ParsedSparkResult {
    validationErrors: [ValidationError]
}
