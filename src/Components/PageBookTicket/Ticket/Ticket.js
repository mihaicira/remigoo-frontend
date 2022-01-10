import "./Ticket.css";
import {useEffect,useState} from 'react';
import {monthNumberToString} from "../../../utils/utils";

function Ticket(props) {
    const [price,setPrice] = useState(0)
    useEffect(()=>{
        const str_prices = props.schedule.prices

        const prices = {
            "standard": str_prices.split('/')[0],
            "child": str_prices.split('/')[1],
            "student": str_prices.split('/')[2],
            "pensionary": str_prices.split('/')[3]
        }
        let sum = 0
        props.tickets.forEach(ticket=>{
            sum = sum + parseInt(prices[ticket.type])
        })

        setPrice(sum)

    },[])

    return (
        <div className="book-page-container ticket-page">

            <div className="ticket-anim-container">
                <svg width="217" height="167" viewBox="0 0 217 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="ticket-anim" clipPath="url(#clip0_27_1671)">
                        <g id="popcorn">
                            <path id="Vector" d="M3.74285 83.8425H75.1156C76.0448 83.8425 76.9359 84.2407 77.593 84.9496C78.2501 85.6584 78.6192 86.6197 78.6192 87.6222V93.6258H0.239258V87.6222C0.239258 86.6197 0.608386 85.6584 1.26544 84.9496C1.92249 84.2407 2.81364 83.8425 3.74285 83.8425V83.8425Z" fill="#3F3D56"/>
                            <path id="Vector_2" d="M73.7607 83.1437C73.408 83.1454 73.0581 83.2096 72.7248 83.334C72.6105 82.8378 72.3317 82.4039 71.9411 82.1142C71.5505 81.8246 71.0752 81.6992 70.6048 81.7618C70.1344 81.8244 69.7015 82.0706 69.3879 82.4539C69.0743 82.8373 68.9016 83.3312 68.9024 83.8425C68.9024 83.8529 68.9048 83.8626 68.905 83.873C68.6621 83.8979 68.4225 83.9514 68.1904 84.0328C68.1246 83.7506 68.0052 83.4863 67.8398 83.2564C67.6745 83.0265 67.4668 82.8362 67.2297 82.6973C67.8524 82.326 68.3448 81.7445 68.6316 81.0422C70.2164 81.0144 71.4935 79.7784 71.4935 78.2521C71.4935 76.7083 70.1884 75.4569 68.5785 75.4569C68.2259 75.4585 67.8759 75.5228 67.5426 75.6471C67.4828 75.3723 67.372 75.1134 67.2169 74.886C67.0618 74.6587 66.8656 74.4676 66.6401 74.3243C66.4147 74.181 66.1646 74.0885 65.9051 74.0523C65.6456 74.0161 65.3819 74.0371 65.1301 74.1139C64.8783 74.1907 64.6435 74.3217 64.4399 74.4991C64.2363 74.6765 64.0682 74.8965 63.9456 75.1459C63.8231 75.3954 63.7486 75.669 63.7268 75.9503C63.705 76.2316 63.7362 76.5148 63.8186 76.7827C63.7412 76.8409 63.669 76.9062 63.5966 76.9711C63.2301 76.6309 62.7543 76.4601 62.2719 76.4955C62.0228 75.7237 61.5299 75.0712 60.8796 74.6521C60.2293 74.2331 59.463 74.0742 58.7151 74.2035C57.9671 74.3327 57.2851 74.7417 56.7886 75.3589C56.2921 75.9761 56.0128 76.762 55.9995 77.5791C55.7396 77.6013 55.483 77.6565 55.235 77.7435C55.2072 77.6253 55.1698 77.5099 55.1233 77.3987C55.379 77.1553 55.5845 76.8567 55.7264 76.5222C55.8683 76.1877 55.9435 75.8247 55.9471 75.4569C55.9471 73.9131 54.642 72.6617 53.0321 72.6617C52.6795 72.6633 52.3295 72.7276 51.9962 72.8519C51.9364 72.5771 51.8256 72.3182 51.6705 72.0908C51.5154 71.8635 51.3192 71.6724 51.0937 71.5291C50.8682 71.3858 50.6182 71.2932 50.3587 71.2571C50.0991 71.2209 49.8355 71.2419 49.5837 71.3187C49.3319 71.3954 49.0971 71.5265 48.8935 71.7039C48.6899 71.8813 48.5218 72.1013 48.3992 72.3507C48.2766 72.6001 48.2022 72.8738 48.1804 73.1551C48.1585 73.4364 48.1898 73.7196 48.2722 73.9875C47.8643 74.2931 47.5272 74.696 47.2871 75.1649C47.047 75.6338 46.9104 76.1562 46.8878 76.6913C46.8604 76.7176 46.829 76.7388 46.803 76.7667C46.8515 76.5672 46.8768 76.3619 46.8783 76.1557C46.8783 74.6119 45.5733 73.3605 43.9634 73.3605C43.6107 73.3621 43.2607 73.4264 42.9275 73.5507C42.8677 73.2759 42.7569 73.017 42.6018 72.7896C42.4466 72.5623 42.2504 72.3712 42.025 72.2279C41.7995 72.0846 41.5494 71.992 41.2899 71.9559C41.0304 71.9197 40.7668 71.9407 40.5149 72.0175C40.2631 72.0942 40.0283 72.2253 39.8248 72.4027C39.6212 72.5801 39.453 72.8001 39.3305 73.0495C39.2079 73.2989 39.1335 73.5726 39.1116 73.8539C39.0898 74.1352 39.121 74.4184 39.2035 74.6863C38.7735 75.0069 38.422 75.4352 38.1792 75.9346C37.9364 76.4339 37.8096 76.9894 37.8096 77.5533C37.8096 78.1171 37.9364 78.6726 38.1792 79.172C38.422 79.6713 38.7735 80.0996 39.2035 80.4202C39.0723 80.8263 39.0723 81.2683 39.2035 81.6743C38.8789 81.9187 38.5981 82.2245 38.3747 82.5771C38.2548 82.1077 37.9863 81.6985 37.6158 81.4204C37.2454 81.1424 36.7963 81.0131 36.3467 81.055C35.897 81.0969 35.4752 81.3074 35.1544 81.6499C34.8337 81.9924 34.6342 82.4453 34.5907 82.9299C34.331 82.7657 34.0505 82.6434 33.7579 82.5669C34.2826 82.1932 34.6958 81.6637 34.9476 81.0422C36.5324 81.0144 37.8096 79.7784 37.8096 78.2521C37.8096 76.7083 36.5045 75.4569 34.8946 75.4569C34.542 75.4585 34.192 75.5228 33.8587 75.6471C33.7989 75.3723 33.6881 75.1134 33.533 74.886C33.3779 74.6587 33.1817 74.4676 32.9562 74.3243C32.7307 74.181 32.4807 74.0885 32.2212 74.0523C31.9616 74.0161 31.698 74.0371 31.4462 74.1139C31.1944 74.1907 30.9596 74.3217 30.756 74.4991C30.5524 74.6765 30.3843 74.8965 30.2617 75.1459C30.1391 75.3954 30.0647 75.669 30.0429 75.9503C30.021 76.2316 30.0523 76.5148 30.1347 76.7827C30.0932 76.8139 30.0557 76.8506 30.0156 76.8838C29.9145 76.8736 29.8163 76.8545 29.7125 76.8545C29.3598 76.8562 29.0099 76.9204 28.6766 77.0447C28.6643 76.992 28.6441 76.9431 28.6283 76.892C28.691 76.5809 28.6861 76.2584 28.6137 75.9497C28.5414 75.6411 28.4037 75.3547 28.2115 75.1131C28.0193 74.8715 27.7777 74.6813 27.5059 74.5574C27.234 74.4335 26.9393 74.3793 26.6447 74.3991C26.476 73.8923 26.201 73.4346 25.8411 73.0616C25.4812 72.6885 25.0462 72.4104 24.5701 72.2489C24.0939 72.0874 23.5897 72.0468 23.0966 72.1305C22.6036 72.2141 22.1352 72.4197 21.728 72.7311C21.3209 73.0424 20.986 73.4512 20.7496 73.9254C20.5132 74.3996 20.3817 74.9263 20.3654 75.4645C20.349 76.0026 20.4483 76.5375 20.6554 77.0273C20.8625 77.5172 21.1719 77.9487 21.5593 78.2882C21.3364 78.3158 21.1167 78.3674 20.9034 78.4423C20.8268 78.1016 20.6715 77.7874 20.452 77.5288C20.2325 77.2703 19.956 77.0759 19.6481 76.9637C19.3402 76.8515 19.011 76.8252 18.6911 76.8872C18.3713 76.9492 18.0712 77.0976 17.8188 77.3184C17.5301 76.9485 17.1689 76.6523 16.7613 76.4513C16.3537 76.2502 15.9097 76.1492 15.4616 76.1557C15.1089 76.1573 14.7589 76.2216 14.4257 76.3459C14.3659 76.0711 14.2551 75.8122 14.0999 75.5848C13.9448 75.3575 13.7486 75.1664 13.5232 75.0231C13.2977 74.8798 13.0476 74.7873 12.7881 74.7511C12.5286 74.7149 12.2649 74.7359 12.0131 74.8127C11.7613 74.8895 11.5265 75.0205 11.3229 75.1979C11.1194 75.3753 10.9512 75.5953 10.8287 75.8447C10.7061 76.0942 10.6317 76.3678 10.6098 76.6491C10.588 76.9304 10.6192 77.2136 10.7017 77.4815C10.2717 77.8022 9.92032 78.2305 9.67754 78.7299C9.43477 79.2292 9.30788 79.7846 9.30776 80.3485C9.30776 80.3593 9.31065 80.3692 9.31073 80.38C8.8514 80.305 8.38187 80.3596 7.94798 80.5387C7.88818 80.2639 7.77738 80.005 7.62226 79.7777C7.46715 79.5503 7.27093 79.3592 7.04547 79.2159C6.82 79.0726 6.56996 78.9801 6.31043 78.9439C6.0509 78.9078 5.78727 78.9287 5.53545 79.0055C5.28364 79.0823 5.04886 79.2133 4.84529 79.3907C4.64171 79.5681 4.47356 79.7881 4.351 80.0376C4.22843 80.287 4.15399 80.5606 4.13216 80.8419C4.11033 81.1232 4.14157 81.4064 4.22399 81.6743C3.59927 82.1306 3.14255 82.8086 2.93326 83.5905C2.72397 84.3724 2.77534 85.2087 3.07844 85.9539C3.38155 86.6992 3.91721 87.3063 4.59227 87.6696C5.26734 88.0329 6.03909 88.1294 6.77331 87.9424C6.89022 88.6715 7.2194 89.3414 7.71309 89.855C8.20678 90.3686 8.83931 90.6992 9.51892 90.7988C10.1985 90.8984 10.8899 90.7619 11.4927 90.409C12.0955 90.0561 12.5784 89.5051 12.8714 88.8362C13.1367 89.4418 13.5583 89.952 14.0856 90.3056C14.613 90.6592 15.2236 90.8413 15.8445 90.83C16.4653 90.8187 17.0699 90.6145 17.5859 90.2418C18.1018 89.8692 18.5072 89.3439 18.7534 88.729C19.1351 88.7232 19.5128 88.6443 19.8689 88.496C20.083 89.1579 20.4774 89.7347 21.0004 90.1508C21.5234 90.567 22.1506 90.8031 22.8001 90.8283C23.4495 90.8534 24.0909 90.6665 24.6402 90.2919C25.1896 89.9174 25.6213 89.3726 25.8789 88.729C26.3511 88.7189 26.8153 88.5949 27.2375 88.3663C27.5331 88.9299 27.9686 89.3933 28.4951 89.7043C29.0216 90.0153 29.6181 90.1616 30.2175 90.1266C30.8169 90.0917 31.3953 89.877 31.8877 89.5066C32.38 89.1362 32.7668 88.6249 33.0043 88.0302C33.1781 88.0256 33.3513 88.006 33.5222 87.9717C33.7646 88.6058 34.1748 89.1489 34.7016 89.533C35.2283 89.9171 35.8484 90.1253 36.4842 90.1316C37.12 90.1378 37.7434 89.9418 38.2765 89.5681C38.8097 89.1944 39.229 88.6595 39.482 88.0302C39.7364 88.0224 39.9891 87.9823 40.2347 87.9104C40.8857 88.1062 41.5777 88.0714 42.2091 87.8113C42.8404 87.5512 43.3777 87.0795 43.7421 86.4655C43.5385 87.3164 43.6398 88.2188 44.0258 88.9928C44.4118 89.7667 45.054 90.3552 45.8244 90.6408C46.5948 90.9265 47.4367 90.8883 48.1822 90.534C48.9276 90.1796 49.5218 89.5351 49.8463 88.729C50.3186 88.7189 50.7828 88.5949 51.2049 88.3663C51.5005 88.9299 51.9361 89.3933 52.4625 89.7043C52.989 90.0153 53.5855 90.1616 54.1849 90.1266C54.7843 90.0917 55.3627 89.877 55.8551 89.5066C56.3475 89.1362 56.7342 88.6249 56.9717 88.0302C57.444 88.0201 57.9082 87.8961 58.3304 87.6675C58.5582 88.1054 58.8717 88.4845 59.249 88.7785C59.6264 89.0724 60.0586 89.2742 60.5155 89.3697C60.9725 89.4653 61.4432 89.4523 61.8951 89.3317C62.3469 89.2111 62.769 88.9858 63.1319 88.6715C63.2444 89.34 63.5359 89.9583 63.9703 90.4502C64.4047 90.942 64.9631 91.2859 65.5766 91.4394C66.1901 91.5929 66.8319 91.5492 67.4226 91.3138C68.0134 91.0784 68.5273 90.6615 68.9011 90.1147C69.2898 90.4361 69.7415 90.6575 70.2216 90.762C70.7017 90.8665 71.1976 90.8513 71.6715 90.7177C72.1453 90.584 72.5846 90.3354 72.9559 89.9907C73.3272 89.6461 73.6206 89.2145 73.8137 88.729C75.3985 88.7012 76.6757 87.4652 76.6757 85.9389C76.6756 84.3951 75.3706 83.1437 73.7607 83.1437ZM15.8644 81.7015C15.861 81.7183 15.8586 81.7356 15.8554 81.7526C15.8317 81.7516 15.8093 81.7461 15.7854 81.7461C15.6886 81.7487 15.5922 81.7592 15.4968 81.7775C15.5021 81.7649 15.5095 81.7536 15.5146 81.741C15.6318 81.7347 15.7485 81.7215 15.8644 81.7015V81.7015ZM42.9275 80.5387C42.918 80.4981 42.9018 80.4607 42.8902 80.4209C43.3848 80.051 43.7747 79.5404 44.0164 78.9458C44.4423 78.9433 44.863 78.8441 45.2511 78.6545C45.6391 78.465 45.9858 78.1893 46.2685 77.8456C46.2437 77.9795 46.2309 78.1156 46.2305 78.2521C46.2332 78.4653 46.2664 78.6768 46.3289 78.8791C45.7727 79.2974 45.3517 79.8929 45.1248 80.5821C44.4204 80.2863 43.6414 80.2709 42.9275 80.5388V80.5387ZM62.3283 80.7993C62.327 80.7565 62.332 80.7123 62.3294 80.6698C62.4119 80.6695 62.4944 80.6634 62.5762 80.6517C62.7019 81.1039 62.9119 81.5235 63.1933 81.8849C63.1322 81.9034 63.0678 81.9146 63.0083 81.9363C62.9036 81.487 62.6647 81.0874 62.3283 80.7993V80.7993Z" fill="#F9A825"/>
                            <path id="Vector_3" d="M6.76438 87.3365C5.84556 87.3365 4.93636 87.5384 4.09226 87.9299C3.24816 88.3214 2.48687 88.8944 1.85483 89.6138C1.22279 90.3333 0.733271 91.1841 0.416133 92.1144C0.0989959 93.0447 -0.0391062 94.035 0.0102559 95.0247L4.39661 160.094C4.4891 161.959 5.24104 163.715 6.49756 164.999C7.75407 166.284 9.41947 167 11.1507 167H67.7077C69.4389 167 71.1043 166.284 72.3609 164.999C73.6174 163.715 74.3693 161.959 74.4618 160.094L78.8482 95.0247C78.8975 94.035 78.7594 93.0447 78.4423 92.1144C78.1251 91.1841 77.6356 90.3333 77.0036 89.6138C76.3716 88.8944 75.6103 88.3214 74.7662 87.9299C73.9221 87.5384 73.0129 87.3365 72.094 87.3365H6.76438Z" fill="#7953B3"/>
                            <path id="Vector_4" d="M13.8422 87.3365H9.95557V167H13.8422V87.3365Z" fill="#FFC107"/>
                            <path id="Vector_5" d="M24.8544 87.3365H20.9678V167H24.8544V87.3365Z" fill="#FFC107"/>
                            <path id="Vector_6" d="M35.8661 87.3365H31.9795V167H35.8661V87.3365Z" fill="#FFC107"/>
                            <path id="Vector_7" d="M46.8783 87.3365H42.9917V167H46.8783V87.3365Z" fill="#FFC107"/>
                            <path id="Vector_8" d="M57.8905 87.3365H54.0039V167H57.8905V87.3365Z" fill="#FFC107"/>
                            <path id="Vector_9" d="M68.9022 87.3365H65.0156V167H68.9022V87.3365Z" fill="#FFC107"/>
                        </g>
                        <g id="glass">
                            <path id="2572ddba-42e8-4159-9036-35cbff74dfb7" d="M132.312 54.6776L130.617 50.2257L108.027 60.2309C107.515 60.4578 107.078 60.8435 106.77 61.3391C106.462 61.8347 106.297 62.4178 106.297 63.0143V89.3449H110.759V64.2292L132.312 54.6776Z" fill="#7953B3"/>
                            <g id="Group">
                                <path id="Vector_10" d="M129.409 45.3877H124.544V62.01H129.409V45.3877Z" fill="#FFC107"/>
                                <path id="Vector_11" d="M121.706 48.8866H116.841V65.5089H121.706V48.8866Z" fill="#FFC107"/>
                                <path id="Vector_12" d="M114.203 63.1035L110.757 64.1969L109.338 46.4812H114.203V63.1035Z" fill="#FFC107"/>
                                <path id="Vector_13" d="M117.041 65.0715H101.633V70.3198H117.041V65.0715Z" fill="#FFC107"/>
                                <path id="Vector_14" d="M117.044 72.2906H101.635V77.5389H117.044V72.2906Z" fill="#FFC107"/>
                                <path id="Vector_15" d="M117.041 79.5098H101.633V84.7581H117.041V79.5098Z" fill="#FFC107"/>
                            </g>
                            <path id="Vector_16" d="M124.544 167H94.7404L87.4404 88.257H131.033L124.544 167Z" fill="#7953B3"/>
                            <path id="Vector_17" d="M134.276 86.9447H84.3999V92.193H134.276V86.9447Z" fill="#7953B3"/>
                        </g>
                        <g id="play">
                            <path id="Vector_18" d="M185.018 68.215C194.276 68.215 201.78 60.119 201.78 50.1321C201.78 40.1453 194.276 32.0493 185.018 32.0493C175.761 32.0493 168.256 40.1453 168.256 50.1321C168.256 60.119 175.761 68.215 185.018 68.215Z" fill="#3AD29F"/>
                            <path id="Vector_19" d="M196.117 50.1322L179.34 59.0251V50.1322V41.2393L196.117 50.1322Z" fill="url(#paint0_linear_27_1671)"/>
                            <path id="Vector_20" d="M195.108 50.1322L180.346 57.9587V50.1322V42.3057L195.108 50.1322Z" fill="white"/>
                            <path id="Vector_21" opacity="0.2" d="M169.627 52.2077C169.63 48.4862 170.697 44.8562 172.682 41.8127C174.667 38.7692 177.474 36.4603 180.72 35.2009C183.966 33.9415 187.493 33.7929 190.821 34.7753C194.148 35.7577 197.113 37.8234 199.313 40.6906C198.115 38.5652 196.523 36.7292 194.638 35.2973C192.752 33.8655 190.613 32.8685 188.355 32.3688C186.096 31.8691 183.766 31.8773 181.51 32.393C179.254 32.9086 177.121 33.9207 175.245 35.3658C173.368 36.811 171.788 38.6582 170.603 40.792C169.418 42.9258 168.653 45.3004 168.357 47.7673C168.061 50.2342 168.24 52.7404 168.883 55.1293C169.526 57.5182 170.618 59.7385 172.092 61.6513C170.476 58.8105 169.622 55.5411 169.627 52.2077V52.2077Z" fill="white"/>
                        </g>
                        <g id="glasses">
                            <path id="Vector_22" d="M182.074 143.985C181.879 143.986 181.692 144.069 181.553 144.218C181.415 144.367 181.337 144.569 181.337 144.78V166.205C181.337 166.416 181.415 166.618 181.553 166.767C181.692 166.916 181.879 167 182.074 167H216.263C216.458 167 216.646 166.916 216.784 166.767C216.922 166.618 217 166.416 217 166.205V144.78C217 144.569 216.922 144.367 216.784 144.218C216.646 144.069 216.458 143.986 216.263 143.985H182.074Z" fill="#7953B3"/>
                            <path id="Vector_23" d="M185.895 145.875C185.531 145.875 185.182 146.031 184.924 146.309C184.667 146.587 184.522 146.964 184.521 147.356V163.629C184.522 164.022 184.667 164.398 184.924 164.676C185.182 164.954 185.531 165.11 185.895 165.111H212.442C212.806 165.11 213.155 164.954 213.413 164.676C213.67 164.398 213.815 164.022 213.816 163.629V147.356C213.815 146.964 213.67 146.587 213.413 146.309C213.155 146.031 212.806 145.875 212.442 145.875L185.895 145.875Z" fill="#FF6584"/>
                            <path id="Vector_24" d="M182.458 151.043H164.649V155.493H182.458V151.043Z" fill="#7953B3"/>
                            <path id="Vector_25" d="M133.661 143.985C133.465 143.986 133.278 144.07 133.14 144.219C133.002 144.367 132.924 144.569 132.924 144.78V166.205C132.924 166.416 133.002 166.618 133.14 166.767C133.278 166.916 133.465 167 133.661 167H167.85C168.045 167 168.232 166.916 168.37 166.767C168.508 166.618 168.586 166.416 168.586 166.205V144.78C168.586 144.569 168.508 144.367 168.37 144.219C168.232 144.07 168.045 143.986 167.85 143.985H133.661Z" fill="#7953B3"/>
                            <path id="Vector_26" d="M137.482 145.875C137.118 145.875 136.769 146.031 136.511 146.309C136.253 146.587 136.108 146.963 136.108 147.356V163.629C136.108 164.022 136.253 164.399 136.511 164.676C136.769 164.954 137.118 165.11 137.482 165.111H164.029C164.393 165.11 164.742 164.954 165 164.676C165.257 164.399 165.402 164.022 165.403 163.629V147.356C165.402 146.963 165.257 146.587 165 146.309C164.742 146.031 164.393 145.875 164.029 145.875L137.482 145.875Z" fill="#FFC107"/>
                        </g>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_27_1671" x1="187.729" y1="59.0252" x2="187.729" y2="41.2393" gradientUnits="userSpaceOnUse">
                            <stop stopOpacity="0.12"/>
                            <stop offset="0.55" stopOpacity="0.09"/>
                            <stop offset="1" stopOpacity="0.02"/>
                        </linearGradient>
                        <clipPath id="clip0_27_1671">
                            <rect width="217" height="167" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>



            <div className="ticket-container">
                <div className="ticket-text">
                    <h3>You're all done!</h3>

                        <div>You just booked {props.tickets.length} tickets for {props.DBMovie.movie.title}!  </div>


                    <div className="ticket-data">
                        <p>Ticket no.: {props.ticketId}</p>
                        <p>Price: {price}€</p>
                        <p>Date and time: {props.schedule.date.split('-')[2]} {monthNumberToString(props.schedule.date.split('-')[1])} {props.schedule.date.split('-')[0]}, {props.schedule.time}</p>
                    </div>
                </div>

            </div>
            <div className="outside-ticket-data">
                <h2>Summary</h2>
                {
                    props.ticketList &&
                    <p>You just booked {props.ticketList.length} tickets for {props.DBMovie.movie.title} ({props.DBMovie.movie.year})</p>
                }

                <p>Ticket no.: {props.ticketId}</p>
                <p>Price: {price}€</p>
                <p>Date and time: {props.schedule.date.split('-')[2]} {monthNumberToString(props.schedule.date.split('-')[1])} {props.schedule.date.split('-')[0]}, {props.schedule.time}</p>
            </div>
        </div>
    );
}

export default Ticket;
