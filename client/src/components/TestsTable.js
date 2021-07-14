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
import { AppContext } from "../context";

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
  //   table: {
  //     minWidth: 500,
  //   },
});

function TestsTable(props) {
  const { judge0Languges } = useContext(AppContext);
  const classes = useStyles();
  function rowClicked(e) {
    props.callback(e.target.id);
    e.preventDefault();
  }

  useEffect(() => {
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
            options={{
              search: true,
            }}
          ></Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Titlu</StyledTableCell>
              <StyledTableCell align="center">Materie</StyledTableCell>
              <StyledTableCell align="center">Limbaj</StyledTableCell>
              <StyledTableCell align="center">Deadline</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item) => (
              <StyledTableRow>
                <a href="tests/takeTest" onClick={(e) => e.preventDefault()}>
                  <StyledTableCell id={item.id} onClick={rowClicked}>
                    {item.titlu}
                  </StyledTableCell>
                </a>
                <StyledTableCell align="center">
                  {item.id_materie}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getLanguage(item.id_limbaj_programare, judge0Languges)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {parseDateTime(item.deadline)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TableContainer>
      </StyledCard>
    </Wrapper>
  );
}

const parseDateTime = (datetime) => {
  try {
    const date = new Date(datetime);
    // console.log(date.getTime());
    return (
      date.toLocaleDateString("ro-RO") +
      ", ora " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  } catch (error) {
    console.log(error);
  }
};

const getLanguage = (languageId, languages) => {
  const language = languages.find((item) => item.id === languageId);
  const regexToRemoveParanthesis = / *\([^)]*\) */g;

  return language.name.replace(regexToRemoveParanthesis, "");
};

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
