import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewRecipeForm from './new-recipe-form';

class RecipeDetails extends Component {
	constructor(props) {
		super(props);

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit() {
			// also needs a name
			ReactDOM.render(<NewRecipeForm
				modifyRecipe={this.props.modifyRecipe}
				ingredients={this.props.ingredients}
				name={this.props.name}
				AuthorText={this.props.AuthorText}
				cuisine={this.props.cuisine}
				btnText='save'
				procedure={this.props.procedure} />,
				document.getElementById('new-container'));
	}

	handleDelete(event) {
		var recipeDetails = {
			title: this.props.name,
			ingredients: this.props.ingredients // might not be needed
		}
		this.props.deleteRecipe(recipeDetails);
	}

	render() {
		return (
			<div className="recipe-details">
			{this.props.AuthorText ?
				(<div className='row'>
				<div className="left">Author</div>
				<div className="right">{this.props.AuthorText}</div>
			</div>) :
			null
			}				
			{this.props.cuisine ?
				(<div className='row'>
				<div className="right">{this.props.cuisine} Cuisine</div>
			</div>) :
			null
			}		
				
				<h3>Ingredients</h3>
				<ul>
					{this.props.ingredients.map((item) => {
						return <li key={item}><p>{item}</p></li>
					})}
				</ul>
						
				{this.props.procedure ?
					(<div>
						<div className='row'>
						<div className="left">Preparation</div>
					</div>				
					<div className="procedure">{this.props.procedure}</div>
				</div>) :
				null
				}
								
				<div className='details-footer'>
					<button className="delete-btn" onClick={this.handleDelete}>Delete</button>
					<button className="edit-btn" onClick={this.handleEdit}>Edit</button>
				</div>
			</div>
		)
	}
}

export default RecipeDetails;
