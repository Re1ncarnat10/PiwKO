import React from 'react';

export const Sidebar = () => {
    return (
        <div className="drawer drawer-auto-gutter drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-side drawer-side-sticky">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li className="flex-row row-span-full">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58z"/>
                            </svg>
                            My Account
                        </a>
                    </li>
                    <li className="flex-row row-span-full">
                        <a>
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0 0 22 15V9a2 2 0 0 0-1-1.72M20 9v6h-7V9zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2z"/>
                                <circle cx="16" cy="12" r="1.5" fill="white"/>
                            </svg>
                            My Wallet
                        </a>
                    </li>
                    <li className="flex-row row-span-full">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256"
                                 className="fill-current">
                                <path
                                    d="M208 20H72a36 36 0 0 0-36 36v168a12 12 0 0 0 12 12h144a12 12 0 0 0 0-24H60v-4a12 12 0 0 1 12-12h136a12 12 0 0 0 12-12V32a12 12 0 0 0-12-12m-88 24h36v59l-10.51-8.41a12 12 0 0 0-15 0L120 103Zm76 128H72a35.6 35.6 0 0 0-12 2.06V56a12 12 0 0 1 12-12h24v84a12 12 0 0 0 19.5 9.37l22.49-18l22.51 18A12 12 0 0 0 180 128V44h16Z"/>
                            </svg>
                            My Courses
                        </a>
                    </li>
                    <li className="flex-row row-span-full">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
                            </svg>
                            Favorite
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    )
}