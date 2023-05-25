import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import './Pagination.css'

export default function Pagination({ items, itemsCountPerPage, setPaginatedItems, path, isChangedSort, isSmallType }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(1)
    const { page } = useParams()

    useEffect(() => {
        setCurrentPage(1)
    }, [isChangedSort])

    useEffect(() => {
        setCurrentPage(Number(page.slice(-1)))
    }, [page])

    useEffect(() => {
        let lastIndex = itemsCountPerPage * currentPage
        let startIndex = lastIndex - itemsCountPerPage

        let slicedArray = items.slice(startIndex, lastIndex)
        setPaginatedItems(slicedArray)

        let numbersOfPage = Math.ceil(items.length / itemsCountPerPage)
        setPagesCount(numbersOfPage)
    }, [currentPage, items])

    return (
        <>
            {isSmallType ?

                <div className='samall-pagination'>
                    <ul className='pagination-btn'>
                        {currentPage > 1 &&
                            <li className='pagination-next btn'>
                                <Link to={`${path}${currentPage - 1}`}>
                                    قبلی
                                </Link>
                            </li>

                        }
                        {currentPage < pagesCount &&
                            <li className='pagination-back btn'>
                                <Link to={`${path}${currentPage + 1}`}>
                                بعدی
                                </Link>
                            </li>
                        }
                    </ul>
                    <div className='page fa-num'> {`صفحه ${currentPage}`}</div>
                </div>

                :
                <div className='pagination fa-num'>
                    <ul className='pagination-list'>
                        {currentPage > 1 &&
                            <li className='pagination-item next'>
                                <Link to={`${path}${currentPage - 1}`}>
                                    <MdOutlineNavigateNext />
                                </Link>
                            </li>

                        }
                        {
                            Array(pagesCount).fill(0).map((item, index) =>
                                <li className={`pagination-item ${index + 1 === currentPage && 'active'}`} key={index + 1}>
                                    <Link to={`${path}${index + 1}`}>{index + 1}</Link>
                                </li>
                            )
                        }

                        {currentPage < pagesCount &&
                            <li className='pagination-item back'>
                                <Link to={`${path}${currentPage + 1}`}>
                                    <MdOutlineArrowBackIosNew />
                                </Link>
                            </li>
                        }

                    </ul>
                </div>
            }
        </>

    )
}
