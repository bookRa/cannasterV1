import React from 'react'
import { Menu, Header } from 'semantic-ui-react'

interface NavBarProps{
    toggleCannaster: ()=> void
}
export const NavMenu: React.FC<NavBarProps> = (props) => {
    return(
        <Menu>
            <Menu.Item
                name='cannaster'
                active={true}
            >
                <Header as='h1' style={{fontFamily:'cursive', color:'MediumSeaGreen'}}>Cannaster</Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item
                color='olive'
                name='toggleCannaster'
                onClick={props.toggleCannaster}
                >
                    Toggle Cannaster
                </Menu.Item>
                <Menu.Item
                    color='pink'
                    name='signup'
                    // active={false}
                    // disabled
                >
                    Sign Up
                </Menu.Item>
                <Menu.Item
                    name='help'
                    // active={false}
                >
                    Help
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
// export default class MenuExampleMenus extends Component {
//   state = {}

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <Menu>
//         <Menu.Item
//           name='browse'
//           active={activeItem === 'browse'}
//           onClick={this.handleItemClick}
//         >
//           Browse
//         </Menu.Item>

//         <Menu.Item
//           name='submit'
//           active={activeItem === 'submit'}
//           onClick={this.handleItemClick}
//         >
//           Submit
//         </Menu.Item>

//         <Menu.Menu position='right'>
//           <Menu.Item
//             name='signup'
//             active={activeItem === 'signup'}
//             onClick={this.handleItemClick}
//           >
//             Sign Up
//           </Menu.Item>

//           <Menu.Item
//             name='help'
//             active={activeItem === 'help'}
//             onClick={this.handleItemClick}
//           >
//             Help
//           </Menu.Item>
//         </Menu.Menu>
//       </Menu>
//     )
//   }
// }