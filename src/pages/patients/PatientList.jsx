import React, { Component } from "react";
import {
  Col,
  Button,
} from "react-bootstrap";
import { RenderLocaleLabel } from "../../components";
import { LocaleKeys } from "../../constants";
import { renderToString } from "react-dom/server";
import { requestService } from "./../../services/request";
import DataTable from "react-data-table-component";

const customStyles = {
  table: {
    style: {
      height: "auto"
    }
  },
  tableWrapper: {
    style: {}
  },
  header: {
    style: {
      fontSize: "14px",
      minHeight: "56px",
      paddingLeft: "16px",
      paddingRight: "8px",
      borderWidth: 5,
      borderRadius: 5
    }
  },
  subHeader: {
    style: {
      paddingTop: "20px",
      backgroundColor: "none",
    }
  },
  head: {
    style: {
      backgroundColor: "#8101cc"
    }
  },
  headRow: {
    style: {
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
      backgroundColor: "#8101cc",
      borderLeftColor: "white",
      textAlign: "center"
    }
  },
  headCells: {
    style: {
      fontWeight: "600",
      fontSize: 14,
      color: "white"
    }
  },
  pagination: {
    style: {
      align: "center",
      textAlign: "center",
      justifyContent: "center"
    }
  }
};

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      searchQuery: ''
    };
  }

  handleChangeQuery = event => {
    this.setState({ searchQuery: event.target.value }, ()=> {
      this.filterPatients();
    });
  };

  filterPatients = () => {
    let filteredDataArray = [];
    if (this.state.searchQuery.trim() !== "") {
      const fliterArray = this.state.data;
      filteredDataArray = fliterArray.filter(
        c => c["firstname"].trim().toLowerCase()
        .includes(this.state.searchQuery.toLowerCase()) || c["lastname"].trim()
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase())
      );
      this.setState({ filteredData: filteredDataArray });
    } else {
      this.setState({ filteredData: this.state.data });
    }
  };

  getPatientsData = () => {
    requestService
      .submit(
        this.props.patientListLetConfig[0].api.url,
        "get",
        null,
        this.props.patientListLetConfig[0].api.parameters
      )
      .then((result)=> {
        if (result.status === "success") {
          this.setState({data:result.payload, filteredData: result.payload});
        } else {
          this.setState({data:[]});
        }
      })
      .catch((error) => {
        console.error(
          error
        ); /* this line can also throw, e.g. when console = {} */
      })
      .finally(()=> {
        this.setState({loading:false});
      });
  }

  componentDidMount = () => {
    this.getPatientsData();
  }

  render() {
    const columns = [
      {
        name: "Patient Id",
        selector: "patientid",
        sortable: true
      },
      {
        name: "First Name",
        selector: "firstname",
        sortable: true
      },
      {
        name: "Last Name",
        selector: "lastname",
        sortable: true
      },
      {
        name: "Dob",
        selector: "DOB",
        sortable: true
      },
      {
        name: "Sex",
        selector: "gender",
        sortable: true
      },
      {
        name: "Zipcode",
        selector: "zipcode",
        sortable: true
      },
      {
        name: "Actions",
        cell: row => (
          <Button
            style={{
              backgroundColor: "#8101cc",
              color: "white",
              fontWeight: 500
            }}
            title={"Edit"}
            variant="contained"
            size="small"
            onClick={() => {}}
          >
            View
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      }
    ];

    return (
      <div class="container-fluid bottom-space">
        <div class="row mt-5">
          <div class="row archiver_cardsview col-lg-12 col-md-12 col-sm-12">
            <p></p>
            <DataTable
              title={
                <h2>
                  <RenderLocaleLabel
                    localeKey={LocaleKeys.PATIENT_TABLE_TITLE}
                  />
                </h2>
              }
              subHeader={true}
              subHeaderAlign={"left"}
              subHeaderComponent={
                <Col xs={12} md={12} style={{ textAlign: "right" }}>
                  <div class="form-group mx-sm-3 mb-2 float-right">
                    <input
                      type="text"
                      className="form-control float-right"
                      placeholder="Search patients"
                      value={this.state.searchQuery}
                      onChange={this.handleChangeQuery}
                    />
                  </div>
                </Col>
              }
              columns={columns}
              data={this.state.filteredData}
              defaultSortField="patientid"
              pagination={true}
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              paginationPerPage={10}
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PatientList;
