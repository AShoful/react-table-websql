/* eslint-disable react/forbid-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { ItemsContext } from '../../Context/ItemsContext';

const useStyles = makeStyles({
  root: {
    margin: '50 auto',
    overflow: 'auto'
  },
  listItem: {
    margin: 3,
    border: '1px solid grey',
    borderRadius: 10,
    paddingLeft: 10
  }
});

function VirtualScroolList({ data, rowHeight, visibleRows }) {
  const rootRef = React.useRef();
  const selectedItems = React.useContext(ItemsContext).items;
  const [start, setStart] = React.useState(0);

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

  const handleChangePage = (event, newPage) => {
    setStart(newPage - 1);
  };

  React.useEffect(() => {
    rootRef.current.scrollTo(0, start * rowHeight);
  }, [start, rowHeight]);

  return (
    <div className={classes.root}>
      <Pagination
        count={data.length}
        page={start + 1}
        hidePrevButton
        hideNextButton
        onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            style={{
              backgroundColor: selectedItems.includes(item.page)
                ? '#33c9dc'
                : '',
              color: selectedItems.includes(item.page) ? '#fff' : ''
            }}
            {...item}
          />
        )}
      />
      <div
        style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }}
        ref={rootRef}
      >
        <div style={{ height: getTopHeight() }} />
        <div>
          {data.slice(start, start + visibleRows + 1).map((_, index) => (
            <div
              className={classes.listItem}
              key={index}
              style={{
                height: rowHeight,
                backgroundColor: selectedItems.includes(_.id) ? '#33c9dc' : '',
                color: selectedItems.includes(_.id) ? '#fff' : ''
              }}
            >
              <span style={{ fontSize: rowHeight / 2 }}>
                {_.id}&ensp;&ensp;{_.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: getBottomHeight() }} />
      </div>
    </div>
  );
}

VirtualScroolList.propTypes = {
  data: PropTypes.array,
  rowHeight: PropTypes.number,
  visibleRows: PropTypes.number
};

VirtualScroolList.defaultProps = {
  data: [],
  rowHeight: 40,
  visibleRows: 5
};

export default VirtualScroolList;
