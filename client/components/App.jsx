import React from 'react';

class CommentForm extends React.Component {
    render(){
        return(
            <div>
                <form className="comment-form form-horizontal" onSubmit={this._Submit.bind(this)}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Nom:</label>
                        <div className="col-sm-6">
                            <input className="form-control" placeholder="Nom:" ref={(input) => this._auteur = input}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Commentaire:</label>
                        <div className="col-sm-6">
                            <textarea  className="form-control" placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
                        </div>
                    </div>
                    <button className="btn btn-success" type="submit">Publier</button>
                </form>
            </div>
        )
    }
    _Submit(event){
        event.preventDefault();
        let auteur = this._auteur;
        let body = this._body;
        this.props.addComment(auteur.value, body.value);
    }
}


class Comment extends React.Component {
    render(){
        return(
            <div className="comment-box panel panel-default" style={{width: '600px', margin: 'auto'}}>
                <h3 className="panel-heading">
                    <span className="glyphicon glyphicon-user"></span>
                    {this.props.auteur}
                </h3>
                <p className="panel-body">
                    {this.props.body}
                </p>
                <div className="panel-footer">
                    <a href="#" className="comment-footer-delete">
                        Supprimer le commentaire
                    </a>
                </div>
            </div>
        )
    }


}
class CommentBox extends React.Component {
    constructor(){
        super();
        this.state = {
            showComments: false,
            comments: [
                {id: 1, auteur: 'Myriam NG', body: 'Oui je suis d\'accord avec toi!' },
                {id: 2, auteur: 'Lucie NG', body : 'Je sais, je sais :)!'},
                {id: 3, auteur: 'ML G', body: 'Ah j\'arrive en retard comme d\'habitude!'}
            ]
        };
    }

    render(){
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Afficher Commentaires';
        if(this.state.showComments){
            buttonText = 'Cacher commentaires';
            commentNodes = <div className="comment-list">{comments}</div>;
        }


        return(
            <div className="comment-box text-center">
                <CommentForm addComment={this._addComment.bind(this)}></CommentForm>
                <button className="btn btn-info" onClick={this._handleClick.bind(this)}>{buttonText}</button>
                <h3>Commentaires</h3>
                <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
                {commentNodes}
            </div>
        )
    }

    _fetchComments(){
        //TODO Recupérer data depuis Firebase
    }

    _addComment(auteur, body){
        const comment = {
            id: this.state.comments.length + 1,
            auteur,
            body
        };
        this.setState({ comments: this.state.comments.concat([comment]) });
    }
    _handleClick(){
        this.setState({showComments: !this.state.showComments});
    }
    _getComments(){

        return this.state.comments.map((comment) => {return (<Comment
            key={comment.id}
            auteur={comment.auteur}
            body={comment.body}/>);});
    }
    _getCommentsTitle(commentCount){
        if(commentCount === 0){
            return 'Aucun commentaire';
        } else if(commentCount === 1) {
            return '1 commentaire';
        } else {
            return `${commentCount} commentaires`;
        }

    }


}

export default class  StoryBox extends React.Component {
    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h1 className="text-center">StoryBox</h1>
                </div>
                <CommentBox></CommentBox>
            </div>
        )
    }
}