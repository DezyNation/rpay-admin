const CommissionStructure = [
    {
        id: "4",
        title: "payout",
        columnDefs: [
            {
                field: "from",
                headerName: "From Value",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "to",
                headerName: "To Value",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "commission",
                headerName: "Retailer Commission",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "is_flat",
                headerName: "Is Flat",
                editable: false,
                cellRenderer: 'switchCellRender',
            },
            {
                field: "fixed_charge",
                headerName: "Fixed Charge",
                cellEditor: 'agTextCellEditor'
            },
            {
                field: "gst",
                headerName: "GST (in %)",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "actions",
                headerName: "Actions",
                editable: false,
                cellRenderer: 'actionsCellRender',
                pinned: 'right'
            },
        ],
        rowData: [
            {
                from: "",
                to: "",
                commission: "",
                is_flat: "1",
                fixed_charge: "",
                gst: "",
                actions: ""
            }
        ]
    },
    {
        id: "7",
        title: "money deposit",
        columnDefs: [
            {
                field: "from",
                headerName: "From Value",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "to",
                headerName: "To Value",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "commission",
                headerName: "Retailer Commission",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "is_flat",
                headerName: "Is Flat",
                editable: false,
                cellRenderer: 'switchCellRender',
            },
            {
                field: "fixed_charge",
                headerName: "Fixed Charge",
                cellEditor: 'agTextCellEditor'
            },
            {
                field: "gst",
                headerName: "GST (in %)",
                cellEditor: 'agTextCellEditor',
            },
            {
                field: "actions",
                headerName: "Actions",
                editable: false,
                cellRenderer: 'actionsCellRender',
                pinned: 'right'
            },
        ],
        rowData: [
            {
                from: "",
                to: "",
                commission: "",
                is_flat: "1",
                fixed_charge: "",
                gst: "",
                actions: ""
            }
        ]
    },
]

export default CommissionStructure