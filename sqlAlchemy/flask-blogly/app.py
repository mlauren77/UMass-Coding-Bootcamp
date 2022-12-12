"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, get_posts

app = Flask(__name__)

# Here we configured the database url, then connect app with SQLAlchemy instance:
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
# Here we set this to false, so we don't see the deprecated warning message
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Here we set this to true, which prints all SQL statements to terminal -- helpful for debugging
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def list_users():
    """Show list of all users in db."""
    users = User.query.all()

    return render_template('listusers.html', users=users)


@app.route('/', methods=["POST"])
def create_user():
    """Create new user."""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    image_url = request.form["image_url"]

    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()

    return redirect(f"/{new_user.id}")


@app.route('/<int:user_id>')
def show_user(user_id):
    """Show details about a single user."""
    user = User.query.get_or_404(user_id)
    
    return render_template('userdetails.html', user=user)


@app.route('/<int:user_id>/edit')
def edit_user(user_id):
    """Show edit user form."""
    user = User.query.get_or_404(user_id)

    return render_template('/edituser.html', user=user)


@app.route('/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    """Handle form submission for updating current user."""

    user = User.query.get_or_404(user_id)
    user.first_name = request.form["first_name"]
    user.last_name = request.form["last_name"]
    user.image_url = request.form["image_url"]

    db.session.add(user)
    db.session.commit()

    return redirect('/')


@app.route('/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Handle form submission for deleting current user."""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect('/')

###Posts route


@app.route('/<int:post_id>/posts')
def list_posts(post_id):
    """Show the current user's post details page."""

    posts = Post.query.all()

    return render_template('postdetails.html', posts=posts)


# @app.route('/<int:post_id>/newpost', methods=["POST"])
# def new_post(post_id):
#     """Handle form submission for creating new post for current user."""

#     post = Postquery.get_or_404(user_id)
#     post.title = request.form["title"]
#     content.title = request.form["content"]

#     db.session.add(post)
#     db.session.commit()

#     return redirect(f"/{user_id}")


#new post with template

#handle new form submission for post

#show the post page with template

#edit post with template

#handle form submission for editing post

#handle form submission for deleting post