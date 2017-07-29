import * as React from 'react';
import { array } from 'prop-types';

import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
import PlyIcon from '../Icon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';

import '../../utils/tap-events';

// just some icons for illustration (example only):
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const styles = {
  
};

function renderFabItems({ fabItems = [],}) {
  return fabItems.map((fi, i) => {
    return (
      <SpeedDialItem
        key={i}
        label={fi.label}
        fabContent={<PlyIcon icon={fi.icon} />}
        onTouchTap={fi.callback}
      />
    );
  });

}

function PlyFab({
  fabItems,
}) {
  return (
    <MuiThemeProvider muiTheme={THEME}>
      <SpeedDial
        fabContentOpen={
          <ContentAdd />
        }
        fabContentClose={
          <NavigationClose />
        }
      >
      { renderFabItems({ fabItems }) }
      </SpeedDial>
    </MuiThemeProvider>
  );
}

PlyFab.propTypes = {
  fabItems: array,
};

export default PlyFab;
