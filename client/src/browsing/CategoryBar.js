import React, {Component} from 'react';
import {Grid, Menu} from 'semantic-ui-react'

class CategoryBar extends Component {
    render() {
        const specialties = this.props.specialties;
        const activeItem = this.props.activeItem;
        const selectSpecialty = this.props.selectSpecialty;

        return (
            <Grid.Column width={4}>
                <Menu color={'blue'}
                      pointing
                      vertical>
                    {specialties.map(specialty => (
                        <Menu.Item name={specialty}
                                   active={activeItem === specialty}
                                   onClick={selectSpecialty}/>
                    ))}
                </Menu>
            </Grid.Column>
        );
    }
}

export default CategoryBar;