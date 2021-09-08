import './App.css'
import React, { useState, useEffect } from 'react'
import Searchbar from './components/Searchbar/Searchbar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import Button from './components/Button/Button'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Modal from './components/Modal/Modal'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [pics, setPics] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {

  }, [modalImage, currentPage])

  return (
    <div className="App" >
      <Searchbar onSubmit={this.saveInputeQuery} />
      <ImageGallery
        pics={this.state.pics}
        openlargeimage={(e) =>
          this.modalOpener(e.target.dataset.large)}
      />
      {this.state.showLoader && (
        <Loader
          className="spin"
          type="Bars"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}
      {this.state.pics.length &&
        <Button onClick={this.loadMore} />}

      {this.state.showModal && (
        <Modal toggleModal={this.toggleModal}
          src={this.state.modalPic} />
      )}
    </div>
  )

}

class OldApp {
  // state = {
  //   searchQuery: '',
  //   pics: [],
  //   showModal: false,
  //   modalImage: '',
  //   showLoader: false,
  //   currentPage: 1,
  // }

  // loaderHandler() {
  //   this.setState((prevState) => ({
  //     showLoader: !prevState.showLoader,
  //   }))
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ pics: [] })
      this.getPics()
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.getPics()
    }
    if (this.state.pics !== prevState.pics) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }
  getPics = () => {
    this.setState({ showLoader: true })
    const { searchQuery, currentPage } = this.state
    const key = '23098764-6c28342abea29650d4f55356c'
    let url = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`

    setTimeout(() => {
      axios.get(url).then((response) => response.data.hits).then(pics => {
        if (pics.length) {
          this.setState(prevState => ({
            pics: [...prevState.pics, ...pics]
          }))
        } else { alert(`${this.state.searchQuery} is not found`) }
      }).catch(error => alert(error)).finally(() => this.setState({ showLoader: false }))
    }, 500)

  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  saveInputeQuery = (query) => {
    this.setState({
      searchQuery: '',
      pics: [],
      showModal: false,
      modalImage: '',
      showLoader: false,
      currentPage: 1,
    })
    this.setState({ searchQuery: query })

  }

  loadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  modalOpener(link) {
    return this.setState({ modalPic: link, showModal: true })
  }
  // render() {
  //   return (
  //     <div className="App" >
  //       <Searchbar onSubmit={this.saveInputeQuery} />
  //       <ImageGallery
  //         pics={this.state.pics}
  //         openlargeimage={(e) =>
  //           this.modalOpener(e.target.dataset.large)}
  //       />
  //       {this.state.showLoader && (
  //         <Loader
  //           className="spin"
  //           type="Bars"
  //           color="#00BFFF"
  //           height={80}
  //           width={80}
  //         />
  //       )}
  //       {this.state.pics.length &&
  //         <Button onClick={this.loadMore} />}

  //       {this.state.showModal && (
  //         <Modal toggleModal={this.toggleModal}
  //           src={this.state.modalPic} />
  //       )}
  //     </div>
  //   )
  // }
}
