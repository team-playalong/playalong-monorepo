module.exports = [{"name":"AutoScroll","description":"","code":"import * as React from 'react';\nimport 'font-awesome/css/font-awesome.css';\nimport Gauge from 'react-svg-gauge';\nimport Icon from '../Icon';\nimport jQuery from 'jquery';\nimport 'jquery-ui/ui/widgets/draggable.js';\n\nconst defaults = {\n  min: 0,\n  max: 5,\n  label: 'Auto Scroll',\n  width: 150,\n  height: 125,\n  color: '#388e3c',\n};\n\nclass AutoScroll extends React.Component {\n  config = {\n    bottomSpeed: 1,\n    topSpeed: 2,\n    baseInterval: 80,\n    maxSpeed: 5,\n    minSpeed: 0,\n  };\n  styles = {\n    widget: {\n      display: 'flex',\n      'align-items': 'center',\n      'justify-content': 'center',\n    },\n  };\n  constructor(props) {\n    super(props);\n\n    this.updateSpeed = this.updateSpeed.bind(this);\n  }\n\n  updateSpeed(num) {\n    if ((num > 0 && this.state.speed < defaults.max) ||\n        (num < 0 && this.state.speed > defaults.min)) {\n      this.setState({\n        speed: this.state.speed + num,\n      });\n      this.updateInterval();\n    }\n\n  }\n\n  updateInterval = function() {\n    const normalizedSpeed = this.normalizeSpeed();\n    if (this.plyInterval) {\n      clearInterval(this.plyInterval);\n    }\n    const newInterval = this.config.baseInterval * (1 / normalizedSpeed);\n    this.plyInterval = setInterval(() => {\n      if (this.state.speed > 0) {\n        window.scrollBy(0, 1);\n      }\n      else {\n        clearInterval(this.plyInterval);\n      }\n    }, newInterval, 0/*infinite*/);\n  };\n\n  normalizeSpeed = function() {\n    const base = this.config.bottomSpeed;\n    const offset = (this.state.speed - base) / (this.config.maxSpeed - this.config.minSpeed);\n    return base + offset;\n  };\n\n  componentWillMount() {\n    this.setState({\n      speed: 0,\n    });\n  }\n\n  componentDidMount() {\n\n    jQuery('.ply-autoscroll-widget').draggable();\n\n  }\n\n  render() {\n    const newProps = Object.assign({}, defaults, this.props);\n    return (\n      <div>\n        <div\n          className='well ply-autoscroll-widget'\n          style={this.styles.widget}\n        >\n          <Icon icon='minus' click={() => this.updateSpeed(-1)} />\n          <Gauge\n            value={this.state.speed}\n            max={newProps.max}\n            width={newProps.width}\n            height={newProps.height}\n            label={newProps.label}\n          />\n          <Icon icon='plus' click={() => this.updateSpeed(1)} />\n        </div>\n      </div>\n    );\n  }\n\n}\n\nAutoScroll.propTypes = {\n}\nexport default AutoScroll;\n","examples":[{"name":"ExampleAutoScroll","description":"Nice Auto Scroll Widget","code":"import React from 'react';\nimport AutoScroll from 'component-root/AutoScroll';\n\n/** Nice Auto Scroll Widget */\nexport default function ExampleAutoScroll() {\n  const styles = { height: 500 }\n  return <div style={styles}><AutoScroll /></div>\n}\n"}]},{"name":"Button","description":"","props":{"type":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'raised'","computed":false}},"label":{"type":{"name":"string"},"required":true,"description":""},"click":{"type":{"name":"func"},"required":true,"description":""},"id":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"generateUuid()","computed":true}}},"code":"import React from 'react';\n// Needed for onTouchTap\nimport PropTypes from 'prop-types';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport RaisedButton from 'material-ui/RaisedButton';\nimport { generateUuid } from '../../utils/uuid';\nimport THEME from '../../utils/theme';\nimport '../../utils/tap-events';\n\nPlyButton.propTypes = {\n  type: PropTypes.string,\n  label: PropTypes.string.isRequired,\n  click: PropTypes.func.isRequired,\n  id: PropTypes.string,\n}\n\nfunction getButtonByType({type, label, click, id}) {\n  switch (type) {\n    case 'raised':\n    default:\n      return <RaisedButton id={id} primary={true} onClick={click} label={label} />;\n  }\n}\n\nfunction PlyButton({type = 'raised', label, click, id = generateUuid()}) {\n\n  return (\n    <MuiThemeProvider muiTheme={THEME}>\n      <span>{getButtonByType({type, label, click, id})}</span>\n    </MuiThemeProvider>\n  );\n}\n\nexport const props = ['label', 'click', 'id'];\nexport default PlyButton;\n","examples":[{"name":"ExampleButton","description":"Example for Playalong Button","code":"import React from 'react';\nimport Button from 'component-root/Button';\n\nfunction clickHandler() {\n  alert('Clicked!');\n}\n\n/** Example for Playalong Button */\nexport default function ExamplePlyButton() {\n  return <Button\n          label=\"I Am a Button!\"\n          click={clickHandler}\n        />\n}\n"}]},{"name":"Dropdown","description":"","props":{"value":{"type":{"name":"union","value":[{"name":"string"},{"name":"number"}]},"required":false,"description":"Initial value of the dropdown"},"options":{"type":{"name":"arrayOf","value":{"name":"shape","value":{"label":{"name":"string","required":false},"value":{"name":"union","value":[{"name":"string"},{"name":"number"}],"required":false}}}},"required":false,"description":"Array of all the options to be presented in the dropdown","defaultValue":{"value":"[]","computed":false}},"change":{"type":{"name":"func"},"required":false,"description":"","defaultValue":{"value":"function() {}","computed":false}}},"code":"import * as React from 'react';\n// import styled from 'styled-components';\nimport { string, number, arrayOf, oneOfType, shape, func } from 'prop-types';\nimport DropDownMenu from 'material-ui/DropDownMenu';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport MenuItem from 'material-ui/MenuItem';\nimport THEME from '../../utils/theme';\nimport '../../utils/tap-events';\n\nPlyDropdown.propTypes = {\n  /** Initial value of the dropdown */\n  value: oneOfType([ string, number]),\n  /** Array of all the options to be presented in the dropdown */\n  options: arrayOf(shape({\n    label: string,\n    value: oneOfType([ string, number]),\n  })),\n  change: func,\n};\n\nfunction renderOption({ label = '', value = null }, i) {\n  return (\n    <MenuItem\n      key={i}\n      value={value}\n      primaryText={label}\n    />\n  );\n}\n\nfunction PlyDropdown({\n  value,\n  options = [],\n  change = function() {},\n}) {\n\n  return (\n    <MuiThemeProvider muiTheme={THEME}>\n      <DropDownMenu\n        value={value}\n        onChange={change}\n      >\n        { options.map(renderOption) }\n      </DropDownMenu>\n    </MuiThemeProvider>\n\n  );\n}\n\n// <MenuItem value={1} primaryText=\"Never\" />\n// <MenuItem value={2} primaryText=\"Every Night\" />\n// <MenuItem value={3} primaryText=\"Weeknights\" />\n// <MenuItem value={4} primaryText=\"Weekends\" />\n// <MenuItem value={5} primaryText=\"Weekly\" />\nexport default PlyDropdown;\n","examples":[{"name":"ExampleDropdown","description":"Avatar Image","code":"import React from 'react';\nimport PlyDropdown from 'component-root/Dropdown';\n\n/** Avatar Image */\nexport default function ExampleDropdown() {\n  const props = {\n    value: 1,\n    options: [\n      { label: 'Superman', value: 1 },\n      { label: 'Batman', value: 2 },\n      { label: 'Wonderwoman', value: 3 },\n    ],\n    change: (e, key, value) => alert(`You chose value ${value}`),\n  };\n  return <PlyDropdown {...props} />;\n}\n"}]},{"name":"Editor","description":"","props":{"change":{"type":{"name":"func"},"required":false,"description":""}},"code":"import * as React from 'react';\nimport PropTypes from 'prop-types';\n\nimport {Editor, EditorState} from 'draft-js';\nimport {stateToHTML} from 'draft-js-export-html';\n\n\nclass PlyEditor extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {editorState: EditorState.createEmpty()};\n    this.onChange = this.onChange.bind(this);\n  }\n\n  onChange(editorState) {\n    if (typeof this.props.change === 'function') {\n      this.props.change(stateToHTML(editorState.getCurrentContent()));\n    }\n\n    this.setState({editorState});\n  }\n\n  render() {\n    return (\n      <Editor editorState={this.state.editorState} onChange={this.onChange} />\n    );\n  }\n}\nPlyEditor.propTypes = {\n  change: PropTypes.func,\n}\n\nexport default PlyEditor;\n","examples":[{"name":"ExampleEditor","description":"Wysiwyg text editor\n  Check out console log for the outcome","code":"import React from 'react';\nimport PlyEditor from 'component-root/Editor';\n\n/** Wysiwyg text editor\n  Check out console log for the outcome\n*/\nexport default function ExampleEditor() {\n  const props = {\n    change: text => console.log(text),\n  };\n  return <PlyEditor {...props}/>\n}\n"}]},{"name":"HelloWorld","description":"A super lame component that says Hello with a custom message.","props":{"message":{"type":{"name":"string"},"required":false,"description":"Message to display","defaultValue":{"value":"'World'","computed":false}}},"code":"import React from 'react';\nimport PropTypes from 'prop-types';\n\n/** A super lame component that says Hello with a custom message. */\nfunction HelloWorld({message}) {\n  return <div>Hello {message}</div>\n}\n\nHelloWorld.propTypes = {\n  /** Message to display */\n  message: PropTypes.string\n};\n\nHelloWorld.defaultProps = {\n  message: 'World'\n};\n\nexport default HelloWorld;\n","examples":[{"name":"ExampleHelloWorld","description":"Custom message","code":"import React from 'react';\nimport HelloWorld from 'component-root/HelloWorld';\n\n/** Custom message */\nexport default function ExampleHelloWorld() {\n  return <HelloWorld message=\"Pluralsight viewers!\" />\n}\n"}]},{"name":"Icon","description":"","props":{"icon":{"type":{"name":"string"},"required":true,"description":""},"click":{"type":{"name":"func"},"required":false,"description":""},"tooltip":{"type":{"name":"string"},"required":false,"description":""},"size":{"type":{"name":"union","value":[{"name":"string"},{"name":"number"}]},"required":false,"description":""}},"code":"import * as React from 'react';\nimport { oneOfType, string, number, func } from 'prop-types';\nimport FontAwesome from 'react-fontawesome';\nimport ReactTooltip from 'react-tooltip';\nimport 'flag-icon-css/css/flag-icon.min.css';\n\nPlyIcon.propTypes = {\n  icon: string.isRequired,\n  click: func,\n  tooltip: string,\n  size: oneOfType([string, number]),\n}\n\nconst styles = {\n  cursor: 'pointer',\n  padding: '5px',\n  verticalAlign: 'middle',\n  fontSize: 'initial',\n};\n\nfunction PlyIcon({ size, icon, flag, click, tooltip }) {\n  if (size) {\n    styles.fontSize = size + 'px';\n  }\n\n  return (\n    <span\n      onClick={click}\n      style={styles}\n      data-tip={tooltip}\n    >\n      { !flag && <FontAwesome name={icon} /> }\n      {\n        flag && <span className={`flag-icon flag-icon-${flag}`}></span>\n      }\n\n      <ReactTooltip place='top' type='dark' effect='float' />\n    </span>\n  );\n}\n\nexport const props = ['icon', 'click', 'tooltip', 'size', 'flag'];\nexport default PlyIcon;\n","examples":[{"name":"ExampleIcon","description":"Nice Icon Man!","code":"import React from 'react';\nimport PlyIcon from 'component-root/Icon';\n\n/** Nice Icon Man! */\nexport default function ExampleIcon() {\n  const props = {\n    // icon: 'trash',\n    click: () => alert('Clicked!'),\n    tooltip: 'Hello from Tooltip',\n    size: 20,\n    flag: 'us',\n  };\n\n  return <PlyIcon {...props} />\n}\n"}]},{"name":"Image","description":"","props":{"src":{"type":{"name":"string"},"required":true,"description":""},"alt":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'No Image Available'","computed":false}},"type":{"type":{"name":"enum","value":[{"value":"'avatar'","computed":false}]},"required":false,"description":"","defaultValue":{"value":"''","computed":false}},"height":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'auto'","computed":false}},"width":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'auto'","computed":false}}},"code":"import 'lazysizes/lazysizes.min.js';\nimport * as React from 'react';\nimport styled from 'styled-components';\nimport { string, oneOf } from 'prop-types';\n\nPlyImage.propTypes = {\n  src: string.isRequired,\n  alt: string,\n  type: oneOf(['avatar']),\n  height: string,\n  width: string,\n}\n\nfunction PlyImage({\n  src,\n  alt='No Image Available',\n  type = '',\n  height = 'auto',\n  width = 'auto',\n}) {\n\n  const ImageComp = styled.img`\n    height: ${height};\n    width: ${width};\n    &.avatar {\n      border-radius: 50%;\n    }\n  `;\n\n\n  return (\n    <ImageComp\n      className={`lazyload ${type.toLowerCase()}`}\n      data-src={src}\n      alt={alt}\n    />\n  );\n}\n\nexport const props = ['isActive'];\nexport default PlyImage;\n","examples":[{"name":"ExampleAvatarImage","description":"Avatar Image","code":"import React from 'react';\nimport PlyImage from 'component-root/Image';\n\n/** Avatar Image */\nexport default function ExampleAvatarImage() {\n  const props = {\n    src: 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg',\n    type: 'avatar',\n    height: '100px',\n    width: '100px',\n  };\n  return <PlyImage {...props} />;\n}\n"},{"name":"ExampleImage","description":"Optimed Image Loading","code":"import React from 'react';\nimport PlyImage from 'component-root/Image';\n\n/** Optimed Image Loading */\nexport default function ExampleImage() {\n  const props = {\n    src: 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg'\n  };\n  return <PlyImage {...props} />;\n}\n"},{"name":"ExampleRegularImage","description":"Regular Image - Notice load time","code":"import React from 'react';\n\n/** Regular Image - Notice load time */\nexport default function ExampleRegularImage() {\n  const props = {\n    src: 'https://farm5.staticflickr.com/4094/4859138371_9713d4396e_b.jpg',\n    type: 'avatar',\n    height: '100px',\n    width: '100px',\n  };\n  return <img src={props.src} alt=\"\" />;\n}\n"}]},{"name":"Modal","description":"Dialog with action buttons. The actions are passed in as an array of React objects,\nin this example [FlatButtons](/#/components/flat-button).\n\nYou can also close this dialog by clicking outside the dialog, or with the 'Esc' key.","props":{"title":{"defaultValue":{"value":"'Dialog Title'","computed":false}}},"code":"import * as React from 'react';\n// import { oneOfType, string, number, func } from 'prop-types';\nimport Dialog from 'material-ui/Dialog';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport THEME from '../../utils/theme';\nimport PlyButton from '../Button';\n\n/**\n * Dialog with action buttons. The actions are passed in as an array of React objects,\n * in this example [FlatButtons](/#/components/flat-button).\n *\n * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.\n */\nclass PlyModal extends React.Component {\n  componentWillMount() {\n    this.setState({\n      isOpen: true,\n    });\n  }\n\n  handleClose(){\n    this.setState({ isOpen: false});\n  }\n\n  defaultProps = {\n    title: 'Dialog Title',\n  };\n\n  render() {\n    const { title } = Object.assign({}, this.defaultProps, this.props);\n\n    const actions = [\n        <PlyButton\n          label=\"Cancel\"\n          primary={true}\n          onTouchTap={this.handleClose}\n        />,\n      ];\n    return (\n      <MuiThemeProvider muiTheme={THEME}>\n        <Dialog\n          title={title}\n          actions={actions}\n          modal={false}\n          open={this.state.isOpen}\n          onRequestClose={this.handleClose}\n        >\n        </Dialog>\n      </MuiThemeProvider>\n    );\n  }\n}\nPlyModal.propTypes = {\n\n};\n\nexport const props = [];\nexport default PlyModal;\n","examples":[{"name":"ExampleModal","description":"Active Spinner","code":"import React from 'react';\nimport PlyModal from 'component-root/Modal';\n\n/** Active Spinner */\nexport default function ExampleModal() {\n  return <PlyModal\n          isOpen={false}\n        />\n}\n"}]},{"name":"RadioButtons","description":"","props":{"legend":{"type":{"name":"string"},"required":false,"description":""},"inputs":{"type":{"name":"arrayOf","value":{"name":"custom","raw":"inputProp"}},"required":false,"description":""}},"code":"import * as React from 'react';\nimport { arrayOf, shape, string } from 'prop-types';\nimport { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport THEME from '../../utils/theme';\n\nfunction RadioButtons(props) {\n\n  let currId;\n  const handleChange = (e, val) => {\n    props.onRadioChanged(val);\n  };\n  const allRadioButtons = props.inputs.map(input => {\n    currId = input.value + Date.now();\n    return (\n        <RadioButton\n          value={input.value}\n          label={input.label}\n          key={currId}\n        />\n    );\n  });\n\n  return (\n    <MuiThemeProvider muiTheme={THEME}>\n      <div className='ply-radio-buttons'>\n        {!!props.legend && <label>{props.legend}</label>}\n        <RadioButtonGroup\n          onChange={handleChange}\n          name={props.radioName || 'radio'}>\n          {allRadioButtons}\n        </RadioButtonGroup>\n      </div>\n    </MuiThemeProvider>\n  );\n};\n\nconst inputProp = shape({\n  value: string,\n  label: string,\n});\nRadioButtons.propTypes = {\n  legend: string,\n  inputs: arrayOf(inputProp),\n};\nexport const props = ['inputs', 'onRadioChanged'];\nexport default RadioButtons;\n","examples":[{"name":"ExampleRadioButtons","description":"Radio Buttons Group","code":"import React from 'react';\nimport RadioButtons from 'component-root/RadioButtons';\n\n/** Radio Buttons Group */\nexport default function ExampleRadioButtons() {\n  const props = {\n    inputs: [\n      { label: 'l1', value: 'v1' },\n      { label: 'l2', value: 'v2' },\n    ],\n    radioName: 'myRadio',\n    onRadioChanged: val => alert(`Selected ${val}`),\n  };\n\n\n  return <RadioButtons {...props} />\n}\n"}]},{"name":"Rating","description":"","props":{"readonly":{"type":{"name":"bool"},"required":false,"description":"","defaultValue":{"value":"false","computed":false}},"max":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"5","computed":false}},"value":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"null","computed":false}},"click":{"type":{"name":"func"},"required":false,"description":"","defaultValue":{"value":"null","computed":false}}},"code":"import React from 'react';\nimport PropTypes from 'prop-types';\nimport 'font-awesome/css/font-awesome.css';\nimport FontAwesome from 'react-fontawesome';\nimport styled from 'styled-components';\nimport COLORS from '../../utils/colors';\n\nconst RatingComp = styled.ul`\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n  li {\n    padding: 1px;\n    color: #ddd;\n    font-size: 20px;\n    list-style-type: none;\n    display: inline-block;\n    cursor: pointer;\n    &.filled {\n      color: ${COLORS.STARS};\n    }\n    &.non-clickable {\n      cursor: default;\n    }\n  }\n`;\n\nconst Rating = ({ max = 5, readonly = false, value = null, click = null }) => {\n  const classNames = `rating ${readonly ? 'readonly' : ''}`;\n\n  function renderRatingOptions(props) {\n    const options = [];\n    let classes;\n    for (let i = 0; i < max; i++) {\n      classes = `\n        star\n        ${value > i ? 'filled' : ''}\n        ${readonly ? 'non-clickable' : ''}\n      `;\n      options.push((\n        <li\n          className={classes}\n          key={i}\n          onClick={() => ratingOptionClicked(i + 1)}\n        >\n          <FontAwesome\n            name='star'\n          />\n        </li>\n      ));\n    }\n    return options;\n  }\n\n  function ratingOptionClicked(val) {\n    if (!readonly && typeof click === 'function') {\n      click(val);\n    }\n  }\n\n  return (\n    <RatingComp className={classNames}>\n      {renderRatingOptions(props)}\n    </RatingComp>\n  );\n};\nRating.propTypes = {\n  readonly: PropTypes.bool,\n  max: PropTypes.number,\n  value: PropTypes.number,\n  click: PropTypes.func,\n};\nexport const props = ['readonly', 'max', 'value', 'click'];\n\nexport default Rating;\n","examples":[{"name":"ExampleRating","description":"Nice Rating","code":"import React from 'react';\nimport Rating from 'component-root/Rating';\n\n/** Nice Rating */\nexport default function ExampleRating() {\n  const val = 3;\n  return <Rating value={val} readonly={false} />\n}\n"}]},{"name":"Spinner","description":"","props":{"isActive":{"type":{"name":"bool"},"required":false,"description":"","defaultValue":{"value":"false","computed":false}}},"code":"import * as React from 'react';\nimport PropTypes from 'prop-types';\n\nimport CircularProgress from 'material-ui/CircularProgress';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport THEME from '../../utils/theme';\n\nSpinner.propTypes = {\n  isActive: PropTypes.bool,\n}\n\n// http://www.material-ui.com/#/components/circular-progress\nfunction Spinner({isActive = false}) {\n  const styles = {\n    display: isActive ? 'block' : 'none',\n    zIndex: '1000',\n    position: 'absolute',\n    top: '50%',\n    left: '50%',\n  };\n  return (\n    <MuiThemeProvider muiTheme={THEME}>\n      <CircularProgress size={60} thickness={5} style={styles}/>\n    </MuiThemeProvider>\n  );\n}\n\nexport const props = ['isActive'];\nexport default Spinner;\n","examples":[{"name":"ExampleSpinner","description":"Active Spinner","code":"import React from 'react';\nimport Spinner from 'component-root/Spinner';\n\n/** Active Spinner */\nexport default function ExampleSpinner() {\n  return <Spinner\n          isActive=\"true\"\n        />\n}\n"}]},{"name":"TextInput","description":"","props":{"id":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"generateUuid()","computed":true}},"name":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'textInput'","computed":false}},"label":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"''","computed":false}},"value":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"''","computed":false}},"placeholder":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"''","computed":false}},"onChange":{"type":{"name":"func"},"required":false,"description":"","defaultValue":{"value":"null","computed":false}},"required":{"type":{"name":"bool"},"required":false,"description":"","defaultValue":{"value":"false","computed":false}}},"code":"import * as React from 'react';\nimport PropTypes from 'prop-types';\nimport TextField from 'material-ui/TextField';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport THEME from '../../utils/theme';\n\nimport { generateUuid } from '../../utils/uuid';\nimport { invokeIfFunction } from '../../utils/common';\n\nfunction setErrorText({value, required}) {\n  return required && !value ?\n    'This field is required' :\n    null;\n}\n\nfunction TextInput({\n  placeholder = '',\n  name = 'textInput',\n  id = generateUuid(),\n  label = '',\n  value = '',\n  required = false,\n  onChange = null,\n}) {\n\n  const handleChange = (e, newValue) => {\n    invokeIfFunction(onChange, e.target.value);\n  };\n\n  return (\n    <MuiThemeProvider muiTheme={THEME}>\n      <div className='ply-text-input'>\n        <label htmlFor={id}>{label}</label>&nbsp;&nbsp;\n        <TextField\n          id={id}\n          name={name}\n          defaultValue={value}\n          hintText={placeholder}\n          errorText={setErrorText({required, value})}\n          onChange={handleChange}\n        />\n      </div>\n    </MuiThemeProvider>\n  );\n}\n\nTextInput.propTypes = {\n  id: PropTypes.string,\n  name: PropTypes.string,\n  label: PropTypes.string,\n  value: PropTypes.string,\n  placeholder: PropTypes.string,\n  onChange: PropTypes.func,\n  required: PropTypes.bool,\n}\n\nexport const props = ['label', 'placeholder', 'onChange'];\nexport default TextInput;\n","examples":[{"name":"ExampleTextInput","description":"Nice TextInput","code":"import React from 'react';\nimport TextInput from 'component-root/TextInput';\n\nclass TextInputContainer extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.handleChange = this.handleChange.bind(this);\n  }\n\n  componentWillMount() {\n    this.setState({ val: '1234' });\n  }\n\n  handleChange(val) {\n    this.setState({ val });\n  }\n\n  render() {\n    return (\n      <div>\n        <TextInput\n          value=\"1234\" name=\"Hey\"\n          onChange={this.handleChange}\n        />\n        <span>{`Value is ${this.state.val}`}</span>\n      </div>\n    );\n  }\n}\n\n/** Nice TextInput */\nexport default function ExampleTextInput() {\n\n  return (<TextInputContainer />);\n}\n"}]},{"name":"TextSlider","description":"","props":{"elementClass":{"type":{"name":"string"},"required":false,"description":""},"size":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"14","computed":false}},"onSliderChanged":{"type":{"name":"func"},"required":false,"description":""},"min":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"12","computed":false}},"max":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"24","computed":false}},"tooltip":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'Change Font Size'","computed":false}}},"code":"import * as React from 'react';\nimport PropTypes from 'prop-types';\nimport styled from 'styled-components';\n\nimport { COLORS } from '../../utils/colors';\n\n\n\nclass TextSlider extends React.Component {\n  defaultProps = {\n    min: 12,\n    max: 24,\n    size: 14,\n    tooltip: 'Change Font Size',\n  };\n\n  constructor(props) {\n    super(props);\n    this.handleSliderChange = this.handleSliderChange.bind(this);\n  }\n\n  componentWillMount() {\n    this.setState({\n      size: this.props.size || this.defaultProps.size,\n    });\n  }\n\n  handleSliderChange(e) {\n    this.setState({\n      size: e.target.value,\n    });\n    if (this.props.elementClass) {\n      const elements = document.querySelectorAll(`.${this.props.elementClass}`);\n      for (let i = 0; i < elements.length; i++) {\n        (elements[i]).style.fontSize = `${e.target.value}px`;\n      }\n    }\n\n    if (typeof this.props.onSliderChanged === 'function') {\n      this.props.onSliderChanged(e.target.value);\n    }\n  }\n\n  render() {\n    this.props = Object.assign({}, this.defaultProps, this.props);\n\n    const TextSliderComp = styled.span`\n      line-height: 100%;\n      font-size: 14px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n\n      .small-letter, .big-letter {\n        font-weight: bold;\n      }\n\n      .small-letter {\n        font-size: ${this.props.min}px;\n      }\n\n      .big-letter {\n        font-size: ${this.props.max}px;\n      }\n\n      .input-wrapper {\n        width: 100%;\n        input {\n          width: 100%;\n          -webkit-appearance: none;\n          display: inline;\n        }\n      }\n\n\n      .slider:focus {\n        outline: none;\n      }\n\n      .slider::-webkit-slider-thumb {\n        border: none;\n        cursor: pointer;\n        -webkit-appearance: none;\n        background-color: ${COLORS.PRIMARY};\n        width: 15px;\n        height: 15px;\n        border-radius: 50%;\n        margin-top: -6px;\n      }\n\n      .slider::-webkit-slider-runnable-track {\n        width: 100%;\n        height: 3px;\n        cursor: pointer;\n        background: ${COLORS.GREY_LIGHT};\n        border: 0;\n      }\n    `;\n\n    return (\n      <TextSliderComp\n        data-tip={this.props.tooltip}\n      >\n        <span className='small-letter'>A</span>\n        <span className=\"input-wrapper\">\n          <input\n            type='range'\n            min={this.props.min}\n            max={this.props.max}\n            className='slider'\n            value={this.state.size}\n            onChange={this.handleSliderChange}\n          />\n        </span>\n        <span className='big-letter'>A</span>\n      </TextSliderComp>\n    );\n  }\n}\nTextSlider.propTypes = {\n  elementClass: PropTypes.string,\n  size: PropTypes.number,\n  onSliderChanged: PropTypes.func,\n  min: PropTypes.number,\n  max: PropTypes.number,\n  tooltip: PropTypes.string,\n};\n\nexport const props = ['size', 'elementClass'];\nexport default TextSlider;\n","examples":[{"name":"ExampleTextSlider","description":"Nice Text Slider","code":"import React from 'react';\nimport TextSlider from 'component-root/TextSlider';\n\n/** Nice Text Slider */\nexport default function ExampleTextSlider() {\n  return <TextSlider />\n}\n"}]},{"name":"Title","description":"","props":{"text":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"''","computed":false}}},"code":"import * as React from 'react';\nimport { string } from 'prop-types';\nimport styled from 'styled-components';\n\nconst TitleComp = styled.h1`\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: .005em;\n`;\n\nTitle.propTypes = {\n  text: string,\n}\nfunction Title({ text = '' }) {\n  return <TitleComp>{text}</TitleComp>;\n}\n\nexport const props = ['text'];\nexport default Title;\n","examples":[{"name":"ExampleTitle","description":"Unified title","code":"import React from 'react';\nimport Title from 'component-root/Title';\n\n/** Unified title */\nexport default function ExampleTitle() {\n  const props = {\n    text: 'I am a nice title'\n  };\n\n  return <Title {...props} />\n}\n"}]},{"name":"Toggle","description":"","props":{"toggled":{"type":{"name":"bool"},"required":false,"description":""},"onToggle":{"type":{"name":"func"},"required":false,"description":""},"label":{"type":{"name":"string"},"required":false,"description":""}},"code":"import * as React from 'react';\nimport PropTypes from 'prop-types';\n\nimport Toggle from 'material-ui/Toggle';\nimport MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';\nimport THEME from '../../utils/theme';\n\n// http://www.material-ui.com/#/components/toggle\nclass PlyToggle extends React.Component {\n\n  constructor(props) {\n    super(props);\n\n    this.handleToggleChange = this.handleToggleChange.bind(this);\n  }\n\n  handleToggleChange(e, val) {\n    if (typeof this.props.onToggle === 'function') {\n      this.props.onToggle(val);\n    }\n  }\n\n  render() {\n    const {\n      label = '', toggled = false\n    } = this.props;\n\n    return (\n      <MuiThemeProvider muiTheme={THEME}>\n        <Toggle\n          label={label}\n          toggled={toggled}\n          onToggle={this.handleToggleChange}\n        />\n      </MuiThemeProvider>\n    );\n  }\n}\nPlyToggle.propTypes = {\n  toggled: PropTypes.bool,\n  onToggle: PropTypes.func,\n  label: PropTypes.string,\n}\n\nexport default PlyToggle;\n","examples":[{"name":"ExampleToggle","description":"Toggle Switch","code":"import React from 'react';\nimport PlyToggle from 'component-root/Toggle';\n\nclass ToggleContainer extends React.Component {\n  toggled;\n\n  constructor(props) {\n    super(props);\n\n    this.onToggle = this.onToggle.bind(this);\n  }\n\n  componentWillMount() {\n    this.setState({ toggled: false});\n  }\n\n  onToggle = val => {\n    alert(`Changed to ${val}`);\n    this.setState({\n      toggled: val,\n    });\n  };\n\n  render() {\n    return <PlyToggle\n      label=\"Yo!\"\n      toggled={this.state.toggled}\n      onToggle={this.onToggle}\n    />\n  }\n\n}\n\n/** Toggle Switch */\nexport default function ExampleToggle() {\n  return <ToggleContainer />\n}\n"}]},{"name":"Youtube","description":"","props":{"id":{"type":{"name":"string"},"required":false,"description":"","defaultValue":{"value":"'plyYoutubeIframe'","computed":false}},"width":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"300","computed":false}},"height":{"type":{"name":"number"},"required":false,"description":"","defaultValue":{"value":"150","computed":false}},"videoId":{"type":{"name":"string"},"required":true,"description":""}},"code":"import * as React from 'react';\nimport 'lazysizes/lazysizes.min.js';\nimport PropTypes from 'prop-types';\n\nYoutube.propTypes = {\n  id: PropTypes.string,\n  width: PropTypes.number,\n  height: PropTypes.number,\n  videoId: PropTypes.string.isRequired,\n}\n\nconst defaultProps = {\n  id: 'plyYoutubeIframe',\n  width: 300,\n  height: 150,\n};\n\nconst youtubePrefix = 'https://www.youtube.com/embed/';\n\nfunction buildVideoId(videoId) {\n  return youtubePrefix + videoId;\n}\n\nfunction Youtube({\n  id = defaultProps.id,\n  width = defaultProps.width,\n  height = defaultProps.height,\n  videoId,\n}) {\n\n  return (\n    <iframe\n      title=\"playalong youtube\"\n      id={id}\n      className={'lazyload'}\n      width={width}\n      height={height}\n      data-src={buildVideoId(videoId)}\n      frameBorder='0'\n      allowFullScreen\n    >\n    </iframe>\n  );\n}\n\nexport const props = ['id', 'width', 'height', 'videoId'];\nexport default Youtube;\n","examples":[{"name":"ExampleRegularYoutube","description":"Non Optimized Content","code":"import React from 'react';\n\n/** Non Optimized Content */\nexport default function ExampleRegularYoutube() {\n  const src = 'https://www.youtube.com/embed/eP4eqhWc7sI';\n  return <iframe\n    title=\"playalong youtube\"\n    src={src}\n    height=\"400\"\n    width=\"800\"\n    frameBorder='0'\n    allowFullScreen\n  >\n  </iframe>\n}\n"},{"name":"ExampleYoutube","description":"Showing Optimized Youtube Content","code":"import React from 'react';\nimport Youtube from 'component-root/Youtube';\n\n/** Showing Optimized Youtube Content */\nexport default function ExampleYoutube() {\n  const props = {\n    videoId: 'Ey_K97x15ek',\n    height: 400,\n    width: 800,\n  };\n  return <Youtube {...props} />\n}\n"}]}]