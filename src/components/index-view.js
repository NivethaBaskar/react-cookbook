import React, { Component } from 'react';
import RecipeListing from './recipe-listing';

class IndexView extends Component {

	render() {
		// var localStorageTest = [{ key: "1", name: 'Lala' }];
		if (this.props.recipeBank === '') {
			return <div>Loading...</div>
		} else {
			return (
				<div className="IndexView">
					<ul id="IndexViewList">
						{this.props.recipeBank.map((item) =>
							// <li>{item.name}</li>
							<RecipeListing
								modifyRecipe={this.props.modifyRecipe}
								deleteRecipe={this.props.deleteRecipe}
								key={item.name}
								name={item.name}
								AuthorText={item.AuthorText}
								cuisine={item.cuisine}
								procedure={item.procedure}
								ingredients={item.ingredients} />
						)}
					</ul>
				</div>
			)
		}

	}
}

export default IndexView;
