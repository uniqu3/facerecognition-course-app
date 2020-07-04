import React from 'react';
import dayjs from 'dayjs';
import './Profile.css';

class Profile extends React.Component {
  state = {
    name: this.props.user.name,
    age: this.props.user.age,
    pet: this.props.user.pet,
  };

  onFormChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'user-name':
        this.setState({
          name: value,
        });
        break;
      case 'user-age':
        this.setState({
          age: value,
        });
        break;
      case 'user-pet':
        this.setState({
          pet: value,
        });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { user } = this.props;
    const { name, age, pet } = this.state;
    const memberSince = dayjs(user.joined).format('MMMM D. YYYY');
    return (
      <div className='profile-modal'>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
          <main className='pa4 black-80 w-80'>
            <img
              alt='profile'
              src='http://tachyons.io/img/logo.jpg'
              className='h3 w3 dib'
            />
            <h1>{this.state.name}</h1>
            <h4>Images submitted: {user.entries}</h4>
            <p>Member since {memberSince}</p>
            <hr />
            <div className='measure'>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='user-name'>
                  Name
                </label>
                <input
                  onChange={this.onFormChange}
                  placeholder={user.name}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='user-name'
                  id='name'
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='user-age'>
                  Age
                </label>
                <input
                  onChange={this.onFormChange}
                  placeholder={user.age}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='user-age'
                  id='age'
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='user-pet'>
                  Pet
                </label>
                <input
                  onChange={this.onFormChange}
                  placeholder={user.pet}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='user-pet'
                  id='pet'
                />
              </div>
              <div
                className='mt4'
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <button
                  onClick={() => this.onProfileUpdate({ name, age, pet })}
                  className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                >
                  Save
                </button>
                <button
                  onClick={this.props.toggleModal}
                  className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className='modal-close' onClick={this.props.toggleModal}>
              &times;
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Profile;
