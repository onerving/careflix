import React, {Component} from 'react';
import {Container, Grid, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

class CategoryBar extends Component {
    render() {
        const specialties = this.props.specialties;
        const activeItem = this.props.activeItem;
        const selectSpecialty = this.props.selectSpecialty;

        return (
            <Container>
                <Grid.Column width={4}>
                    <Menu inverted color={'blue'}
                          pointing
                          vertical>
                        {specialties.map(specialty => (
                            <Menu.Item name={specialty}
                                       active={activeItem === specialty}
                                       onClick={selectSpecialty}/>
                        ))}
                        <Link to={'/history'}>
                            <Menu.Item name={'Historial'}/>
                        </Link>

                    </Menu>
                </Grid.Column>
            </Container>
        );
    }
}

export default CategoryBar;