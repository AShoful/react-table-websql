/* eslint-disable react/forbid-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ItemsContext } from '../../Context/ItemsContext';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    overflow: 'auto'
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%'
  },
  td: {
    paddingLeft: 10,
    border: '1px solid lightgray'
  }
});

function VirtualScrool({ data, rowHeight, visibleRows }) {
  const selectedItems = React.useContext(ItemsContext);
  const rootRef = React.useRef();
  const [start, setStart] = React.useState(0);
  const [check, setCheck] = React.useState(selectedItems.items || []);

  const classes = useStyles();

  function getTopHeight() {
    return rowHeight * start;
  }
  function getBottomHeight() {
    return rowHeight * (data.length - (start + visibleRows + 1));
  }

  React.useEffect(() => {
    function onScroll(e) {
      setStart(() => {
        return Math.min(
          data.length - visibleRows - 1,
          Math.floor(e.target.scrollTop / rowHeight)
        );
      });
    }
    rootRef.current.addEventListener('scroll', onScroll);
    return () => {
      rootRef.current.removeEventListener('scroll', onScroll);
    };
  }, [data.length, visibleRows, rowHeight]);

  React.useEffect(() => {
    return selectedItems.setItems(check);
  });

  const handleCheck = (id) => {
    setCheck(() => {
      if (!check.includes(id)) {
        return [...check, ...[id]];
      }
      return check.filter((i) => i !== id);
    });
  };

  const handleCheckAll = () => {
    setCheck(() => {
      if (check.length < data.length) {
        return Array(data.length)
          .fill('')
          .map((_, i) => i);
      }
      return [];
    });
  };

  return (
    <div className={classes.root}>
      <table
        className={classes.table}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}
      >
        <tbody>
          <tr style={{ height: rowHeight }}>
            <td style={{ width: '10%' }} className={classes.td}>
              <input
                type="checkbox"
                checked={check.length === data.length}
                onChange={handleCheckAll}
              />
            </td>
            <td style={{ width: '20%' }} className={classes.td}>
              id
            </td>
            <td style={{ width: '70%' }} className={classes.td}>
              text
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          height: rowHeight * visibleRows + 1,
          fontSize: rowHeight / 2,
          overflow: 'auto'
        }}
        ref={rootRef}
      >
        <div style={{ height: getTopHeight() }} />
        <table className={classes.table}>
          <tbody>
            {data.slice(start, start + visibleRows + 1).map((row, rowIndex) => (
              <tr style={{ height: rowHeight }} key={start + rowIndex}>
                <td style={{ width: '10%' }} className={classes.td}>
                  <input
                    type="checkbox"
                    checked={check.includes(row.id)}
                    onChange={() => handleCheck(row.id)}
                  />
                </td>
                <td style={{ width: '20%' }} className={classes.td}>
                  {row.id}
                </td>
                <td style={{ width: '70%' }} className={classes.td}>
                  {row.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: getBottomHeight() }} />
      </div>
    </div>
  );
}

VirtualScrool.propTypes = {
  data: PropTypes.array,
  rowHeight: PropTypes.number,
  visibleRows: PropTypes.number
};

VirtualScrool.defaultProps = {
  data: [],
  rowHeight: 40,
  visibleRows: 5
};

export default VirtualScrool;
