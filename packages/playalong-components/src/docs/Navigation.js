import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import COLORS from '../utils/colors'

const NavigationComp = styled.div`
  h1 {
    padding-left: 15px;
    margin-bottom: 0;
  }
  .navigation {
    float: left;
    width: 250px;
    list-style-type: none;
    padding: 0;

    .navigationp-item {
      padding: 15px;
      border: 1px solid ${COLORS.GREY_LIGHT};

      a {
        color: ${COLORS.SECONDARY};
      }

    }
  }
`

const Navigation = ({components}) => {
  return (
    <NavigationComp>
      <h1>Playalong Components</h1>
      <ul className="navigation">
        {
          components.map(name => {
            return (
              <li key={name} className="navigationp-item">
                <a href={`#${name}`}>{name}</a>
              </li>
            )
          })
        }
      </ul>
    </NavigationComp>
  )
}

Navigation.propTypes = {
  components: PropTypes.array.isRequired
}

export default Navigation
