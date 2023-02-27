import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { BOARD } from './Parameters'

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56
};

const headerStyle = {
  fontSize: '30px',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  marginBottom: '26px',
}

const displayStyle = {
  display: "inline",
};

const sideTextStyle = {
  fontSize: '20px',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const tableStyle = {
  backgroundColor: '#e0e0e0',
  display: "table",
  width: "160px",
  border: 1,
  borderStyle: 'solid',
  borderColor: '#6495ed',
  borderRadius: '10%',
  borderTop: 'none',
  fontSize: '10px',
  margin: '20px',
  padding: '5px',
  marginTop: '0px',
};

const tableRowStyle = {
  flexDirection: "row"
};

const dtableCellStyle = {
  color: '#bebebe',
  textAlign: "center",
  width: '12px',
  height: '12px',
  margin: 5,
  fontSize: 10
};

const rtableCellStyle = {
  color: '#c01d1d',
  textAlign: "center",
  width: '12px',
  height: '12px',
  margin: 5,
  fontSize: 10
};

const ytableCellStyle = {
  color: '#272727',
  textAlign: "center",
  width: '12px',
  height: '12px',
  margin: 5,
  fontSize: 10
};


function getTableCell(content) {
  switch (content) {
    case '':
      return <Text style={dtableCellStyle}>.</Text>;
    case 'yPlayer':
      return <Text style={ytableCellStyle}>O</Text>;
    case 'rPlayer':
      return <Text style={rtableCellStyle}>O</Text>;
    default:
      return <Text style={rtableCellStyle}>X</Text>;
  }
}

function getTables(boards, winners) {
  var layout = []
  boards.forEach((e, i) => {
    console.log(winners, winners[i])
    layout.push(
      <View style={displayStyle}>
        <View style={tableRowStyle}>

          <View style={tableStyle}>
            {BOARD.map(row =>
              <View style={tableRowStyle}>
                {row.map(j => getTableCell(e[j]))}
              </View>
            )}
          </View>

          <View style={sideTextStyle}>
            <Text>{winners[i] ? 'Yellow score' : 'Red score'}</Text>
          </View>

        </View>
      </View>
    )
  })
  return layout
}

function getScore(winners) {
  var cpt = {}
  winners.forEach(function (x) { cpt[x] = (cpt[x] || 0) + 1 })
  return (
    <View style={headerStyle}>
      <Text>
        {cpt[true] === cpt[false] ? 'Draw' : cpt[true] > cpt[false] ? 'Yellow Won' : 'Red Won'}
      </Text>
      <Text>
        Yellow - {cpt[true]} / Red - {cpt[false]}
      </Text>
    </View>
  )
}


export function downloadPdf(boards, winners) {

  return (
    <Document>
      <Page style={pageStyle} size="A4" orientation="portrait">

        <View style={displayStyle}>
          {getScore(winners)}
        </View>
        {getTables(boards, winners)}

      </Page>
    </Document>
  )
}









