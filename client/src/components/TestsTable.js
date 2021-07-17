import { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import theme from "../Assets/theme";
import { Card } from "./defaultComponents";
import { AppContext, AuthContext } from "../context";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: theme.Grey1,
    color: "black",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.mainGrey,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    // minWidth: 500,
    // marginInline: 200,
    // minHeight: 200,
  },
});

const studentColumns = ["Titlu", "Materie", "Limbaj", "Deadline"];
const teacherColumns = [
  "Nume",
  "Prenume",
  "Grupa",
  "Titlu Test",
  "Materie",
  "Limbaj",
  "Deadline",
];

const studentDataColumns = [
  "titlu",
  "id_materie",
  "limbaj",
  "formatedDeadline",
];

const teacherDataColumns = [
  "nume",
  "prenume",
  "grupa",
  "titlu",
  "id_materie",
  "limbaj",
  "formatedDeadline",
];

function TestsTable(props) {
  const user = useContext(AuthContext).authState.userInfo;

  const [columns, setColumns] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  const { judge0Languges } = useContext(AppContext);
  const classes = useStyles();

  function rowClicked(e) {
    props.callback(e.target.id);
    e.preventDefault();
  }

  useEffect(() => {
    if (user.tip === "student") {
      setColumns(studentColumns);
      setDataColumns(studentDataColumns);
    } else {
      setColumns(teacherColumns);
      setDataColumns(teacherDataColumns);
    }
    console.log(props.data);
  }, [props.data]);

  return (
    <Wrapper>
      <StyledCard>
        <TableTitle>{props.title}</TableTitle>
        <TableContainer className="tableContainer">
          <Table
            className={classes.table}
            aria-label="customized table"
          ></Table>
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <StyledTableCell
                  key={index}
                  align={index !== 0 ? "center" : ""}
                >
                  {item}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, index) => (
              <StyledTableRow key={index}>
                {dataColumns.map((column, cindex) => {
                  if (column === "titlu") {
                    return (
                      <StyledTableCell key={cindex}>
                        <a
                          href={props.redirectPath}
                          id={item.id}
                          onClick={rowClicked}
                        >
                          {item[column]}
                        </a>
                      </StyledTableCell>
                    );
                  } else {
                    return (
                      <StyledTableCell key={cindex}>
                        {item[column]}
                      </StyledTableCell>
                    );
                  }
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </TableContainer>
      </StyledCard>
    </Wrapper>
  );
}

const TableTitle = styled.div`
  font-style: "Roboto";
  color: ${theme.mainBlack};
  font-size: 1.3rem;
  font-weight: 500;
  margin: 1rem;
  margin-left: 2rem;
`;

const StyledCard = styled(Card)`
  padding: 0;
`;

const Wrapper = styled.div`
  //   width: 100%;
  //   height: 100%;
  .tableContainer {
    max-width: 50vw;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20vw;
  margin-top: 20vh;
`;

export default TestsTable;
