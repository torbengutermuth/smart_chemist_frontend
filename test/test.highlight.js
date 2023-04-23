describe('highlight', () => {
  const response = [{ svg: "<?xml version='1.0' encoding='iso-8859-1'?>\n<svg version='1.1' baseProfile='full'\n xmlns='http://www.w3.org/2000/svg'\n xmlns:rdkit='http://www.rdkit.org/xml'\n xmlns:xlink='http://www.w3.org/1999/xlink'\n xml:space='preserve'\nwidth='400px' height='400px' viewBox='0 0 400 400'>\n<!-- END OF HEADER -->\n<rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='400.0' height='400.0' x='0.0' y='0.0'> </rect>\n<path class='bond-0 atom-0 atom-1' d='M 90.9,262.4 L 95.4,231.4' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-0 atom-0 atom-1' d='M 95.4,231.4 L 99.8,200.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-0 atom-0 atom-1' d='M 101.6,264.0 L 106.1,233.0' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-0 atom-0 atom-1' d='M 106.1,233.0 L 110.6,202.0' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-1 atom-1 atom-2' d='M 104.8,204.3 L 82.2,186.5' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-1 atom-1 atom-2' d='M 82.2,186.5 L 59.7,168.7' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-2 atom-1 atom-3' d='M 104.8,204.3 L 172.1,177.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-3 atom-3 atom-4' d='M 172.1,177.4 L 176.3,148.1' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-3 atom-3 atom-4' d='M 176.3,148.1 L 180.5,118.8' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-4 atom-3 atom-5' d='M 172.1,177.4 L 229.0,222.3' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-5 atom-5 atom-6' d='M 229.0,222.3 L 224.7,251.7' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-5 atom-5 atom-6' d='M 224.7,251.7 L 220.4,281.2' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-6 atom-5 atom-7' d='M 229.0,222.3 L 296.2,195.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-7 atom-7 atom-8' d='M 301.2,199.3 L 305.6,168.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-7 atom-7 atom-8' d='M 305.6,168.4 L 310.1,137.6' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-7 atom-7 atom-8' d='M 290.4,197.7 L 294.9,166.9' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-7 atom-7 atom-8' d='M 294.9,166.9 L 299.4,136.0' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-8 atom-7 atom-9' d='M 296.2,195.4 L 318.8,213.2' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-8 atom-7 atom-9' d='M 318.8,213.2 L 341.3,230.9' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path d='M 103.6,203.4 L 104.8,204.3 L 108.1,202.9' style='fill:none;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />\n<path d='M 292.9,196.7 L 296.2,195.4 L 297.4,196.3' style='fill:none;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />\n<path class='atom-0' d='M 85.0 276.0\nQ 85.0 271.1, 87.4 268.4\nQ 89.8 265.6, 94.4 265.6\nQ 98.9 265.6, 101.4 268.4\nQ 103.8 271.1, 103.8 276.0\nQ 103.8 281.0, 101.3 283.9\nQ 98.9 286.7, 94.4 286.7\nQ 89.9 286.7, 87.4 283.9\nQ 85.0 281.1, 85.0 276.0\nM 94.4 284.4\nQ 97.5 284.4, 99.2 282.3\nQ 100.9 280.2, 100.9 276.0\nQ 100.9 272.0, 99.2 270.0\nQ 97.5 267.9, 94.4 267.9\nQ 91.3 267.9, 89.5 270.0\nQ 87.9 272.0, 87.9 276.0\nQ 87.9 280.2, 89.5 282.3\nQ 91.3 284.4, 94.4 284.4\n' fill='#FF0000'/>\n<path class='atom-2' d='M 18.2 149.3\nL 21.0 149.3\nL 21.0 158.0\nL 31.5 158.0\nL 31.5 149.3\nL 34.2 149.3\nL 34.2 169.8\nL 31.5 169.8\nL 31.5 160.3\nL 21.0 160.3\nL 21.0 169.8\nL 18.2 169.8\nL 18.2 149.3\n' fill='#FF0000'/>\n<path class='atom-2' d='M 38.4 159.5\nQ 38.4 154.6, 40.9 151.8\nQ 43.3 149.1, 47.9 149.1\nQ 52.4 149.1, 54.8 151.8\nQ 57.3 154.6, 57.3 159.5\nQ 57.3 164.5, 54.8 167.3\nQ 52.4 170.1, 47.9 170.1\nQ 43.3 170.1, 40.9 167.3\nQ 38.4 164.5, 38.4 159.5\nM 47.9 167.8\nQ 51.0 167.8, 52.7 165.7\nQ 54.4 163.6, 54.4 159.5\nQ 54.4 155.5, 52.7 153.4\nQ 51.0 151.4, 47.9 151.4\nQ 44.7 151.4, 43.0 153.4\nQ 41.3 155.4, 41.3 159.5\nQ 41.3 163.6, 43.0 165.7\nQ 44.7 167.8, 47.9 167.8\n' fill='#FF0000'/>\n<path class='atom-4' d='M 173.0 105.8\nQ 173.0 100.9, 175.4 98.1\nQ 177.9 95.3, 182.4 95.3\nQ 187.0 95.3, 189.4 98.1\nQ 191.9 100.9, 191.9 105.8\nQ 191.9 110.8, 189.4 113.6\nQ 186.9 116.4, 182.4 116.4\nQ 177.9 116.4, 175.4 113.6\nQ 173.0 110.8, 173.0 105.8\nM 182.4 114.1\nQ 185.6 114.1, 187.2 112.0\nQ 189.0 109.9, 189.0 105.8\nQ 189.0 101.7, 187.2 99.7\nQ 185.6 97.7, 182.4 97.7\nQ 179.3 97.7, 177.6 99.7\nQ 175.9 101.7, 175.9 105.8\nQ 175.9 109.9, 177.6 112.0\nQ 179.3 114.1, 182.4 114.1\n' fill='#FF0000'/>\n<path class='atom-4' d='M 195.0 95.6\nL 197.8 95.6\nL 197.8 104.3\nL 208.3 104.3\nL 208.3 95.6\nL 211.1 95.6\nL 211.1 116.1\nL 208.3 116.1\nL 208.3 106.6\nL 197.8 106.6\nL 197.8 116.1\nL 195.0 116.1\nL 195.0 95.6\n' fill='#FF0000'/>\n<path class='atom-6' d='M 209.2 294.0\nQ 209.2 289.1, 211.6 286.3\nQ 214.0 283.6, 218.6 283.6\nQ 223.1 283.6, 225.6 286.3\nQ 228.0 289.1, 228.0 294.0\nQ 228.0 299.0, 225.5 301.8\nQ 223.1 304.7, 218.6 304.7\nQ 214.1 304.7, 211.6 301.8\nQ 209.2 299.0, 209.2 294.0\nM 218.6 302.3\nQ 221.7 302.3, 223.4 300.3\nQ 225.1 298.1, 225.1 294.0\nQ 225.1 290.0, 223.4 288.0\nQ 221.7 285.9, 218.6 285.9\nQ 215.5 285.9, 213.7 287.9\nQ 212.1 290.0, 212.1 294.0\nQ 212.1 298.2, 213.7 300.3\nQ 215.5 302.3, 218.6 302.3\n' fill='#FF0000'/>\n<path class='atom-6' d='M 231.2 283.8\nL 234.0 283.8\nL 234.0 292.5\nL 244.5 292.5\nL 244.5 283.8\nL 247.2 283.8\nL 247.2 304.3\nL 244.5 304.3\nL 244.5 294.9\nL 234.0 294.9\nL 234.0 304.3\nL 231.2 304.3\nL 231.2 283.8\n' fill='#FF0000'/>\n<path class='atom-8' d='M 297.2 123.8\nQ 297.2 118.8, 299.6 116.1\nQ 302.1 113.3, 306.6 113.3\nQ 311.2 113.3, 313.6 116.1\nQ 316.0 118.8, 316.0 123.8\nQ 316.0 128.7, 313.6 131.6\nQ 311.1 134.4, 306.6 134.4\nQ 302.1 134.4, 299.6 131.6\nQ 297.2 128.8, 297.2 123.8\nM 306.6 132.1\nQ 309.8 132.1, 311.4 130.0\nQ 313.1 127.9, 313.1 123.8\nQ 313.1 119.7, 311.4 117.7\nQ 309.8 115.6, 306.6 115.6\nQ 303.5 115.6, 301.8 117.7\nQ 300.1 119.7, 300.1 123.8\nQ 300.1 127.9, 301.8 130.0\nQ 303.5 132.1, 306.6 132.1\n' fill='#FF0000'/>\n<path class='atom-9' d='M 343.7 240.3\nQ 343.7 235.4, 346.2 232.6\nQ 348.6 229.9, 353.2 229.9\nQ 357.7 229.9, 360.1 232.6\nQ 362.6 235.4, 362.6 240.3\nQ 362.6 245.3, 360.1 248.1\nQ 357.6 250.9, 353.2 250.9\nQ 348.6 250.9, 346.2 248.1\nQ 343.7 245.3, 343.7 240.3\nM 353.2 248.6\nQ 356.3 248.6, 358.0 246.5\nQ 359.7 244.4, 359.7 240.3\nQ 359.7 236.3, 358.0 234.2\nQ 356.3 232.2, 353.2 232.2\nQ 350.0 232.2, 348.3 234.2\nQ 346.6 236.2, 346.6 240.3\nQ 346.6 244.4, 348.3 246.5\nQ 350.0 248.6, 353.2 248.6\n' fill='#FF0000'/>\n<path class='atom-9' d='M 365.8 230.1\nL 368.5 230.1\nL 368.5 238.8\nL 379.0 238.8\nL 379.0 230.1\nL 381.8 230.1\nL 381.8 250.6\nL 379.0 250.6\nL 379.0 241.1\nL 368.5 241.1\nL 368.5 250.6\nL 365.8 250.6\nL 365.8 230.1\n' fill='#FF0000'/>\n</svg>\n", matches: [{ atom_indices: [3, 1, 0, 2], trivial_name: { name: 'Acid', smarts: '*~[CX3](=O)[OH,O-]', group: 'functional_group' } }, { atom_indices: [5, 7, 8, 9], trivial_name: { name: 'Acid', smarts: '*~[CX3](=O)[OH,O-]', group: 'functional_group' } }, { atom_indices: [1], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [3], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [5], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [7], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [1, 2, 3, 4], trivial_name: { name: 'Glycol', smarts: '[#6](-[O$([O;H1]),$(O-[#6])])-[#6]-[O$([O;H1]),$(O-[#6])]', group: 'functional_group' } }, { atom_indices: [3, 4, 5, 6], trivial_name: { name: 'Glycol', smarts: '[#6](-[O$([O;H1]),$(O-[#6])])-[#6]-[O$([O;H1]),$(O-[#6])]', group: 'functional_group' } }, { atom_indices: [5, 6, 7, 9], trivial_name: { name: 'Glycol', smarts: '[#6](-[O$([O;H1]),$(O-[#6])])-[#6]-[O$([O;H1]),$(O-[#6])]', group: 'functional_group' } }] }, { name: 'GOL', svg: "<?xml version='1.0' encoding='iso-8859-1'?>\n<svg version='1.1' baseProfile='full'\n              xmlns='http://www.w3.org/2000/svg'\n                      xmlns:rdkit='http://www.rdkit.org/xml'\n                      xmlns:xlink='http://www.w3.org/1999/xlink'\n                  xml:space='preserve'\nwidth='400px' height='400px' viewBox='0 0 400 400'>\n<!-- END OF HEADER -->\n<rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='400.0' height='400.0' x='0.0' y='0.0'> </rect>\n<path class='bond-0 atom-0 atom-1' d='M 124.8,270.8 L 94.2,253.1' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-0 atom-0 atom-1' d='M 94.2,253.1 L 63.5,235.4' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-1 atom-0 atom-2' d='M 124.8,270.8 L 199.4,227.7' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-2 atom-2 atom-3' d='M 199.4,227.7 L 199.4,192.1' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-2 atom-2 atom-3' d='M 199.4,192.1 L 199.4,156.4' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-3 atom-2 atom-4' d='M 199.4,227.7 L 274.0,270.8' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-4 atom-4 atom-5' d='M 274.0,270.8 L 304.6,253.1' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path class='bond-4 atom-4 atom-5' d='M 304.6,253.1 L 335.2,235.4' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />\n<path  class='atom-1' d='M 18.2 215.6\nL 21.5 215.6\nL 21.5 226.0\nL 34.0 226.0\nL 34.0 215.6\nL 37.3 215.6\nL 37.3 240.0\nL 34.0 240.0\nL 34.0 228.8\nL 21.5 228.8\nL 21.5 240.0\nL 18.2 240.0\nL 18.2 215.6\n' fill='#FF0000'/>\n<path  class='atom-1' d='M 39.0 227.8\nQ 39.0 221.9, 41.9 218.6\nQ 44.8 215.4, 50.2 215.4\nQ 55.6 215.4, 58.5 218.6\nQ 61.4 221.9, 61.4 227.8\nQ 61.4 233.7, 58.5 237.1\nQ 55.5 240.4, 50.2 240.4\nQ 44.8 240.4, 41.9 237.1\nQ 39.0 233.7, 39.0 227.8\nM 50.2 237.7\nQ 53.9 237.7, 55.9 235.2\nQ 57.9 232.7, 57.9 227.8\nQ 57.9 223.0, 55.9 220.6\nQ 53.9 218.1, 50.2 218.1\nQ 46.5 218.1, 44.4 220.5\nQ 42.4 222.9, 42.4 227.8\nQ 42.4 232.7, 44.4 235.2\nQ 46.5 237.7, 50.2 237.7\n' fill='#FF0000'/>\n<path  class='atom-3' d='M 188.2 141.6\nQ 188.2 135.8, 191.1 132.5\nQ 194.0 129.2, 199.4 129.2\nQ 204.8 129.2, 207.7 132.5\nQ 210.6 135.8, 210.6 141.6\nQ 210.6 147.6, 207.7 150.9\nQ 204.7 154.3, 199.4 154.3\nQ 194.0 154.3, 191.1 150.9\nQ 188.2 147.6, 188.2 141.6\nM 199.4 151.5\nQ 203.1 151.5, 205.1 149.0\nQ 207.1 146.5, 207.1 141.6\nQ 207.1 136.8, 205.1 134.4\nQ 203.1 132.0, 199.4 132.0\nQ 195.7 132.0, 193.6 134.4\nQ 191.6 136.8, 191.6 141.6\nQ 191.6 146.6, 193.6 149.0\nQ 195.7 151.5, 199.4 151.5\n' fill='#FF0000'/>\n<path  class='atom-3' d='M 213.5 129.5\nL 216.8 129.5\nL 216.8 139.9\nL 229.3 139.9\nL 229.3 129.5\nL 232.6 129.5\nL 232.6 153.9\nL 229.3 153.9\nL 229.3 142.6\nL 216.8 142.6\nL 216.8 153.9\nL 213.5 153.9\nL 213.5 129.5\n' fill='#FF0000'/>\n<path  class='atom-5' d='M 337.4 227.8\nQ 337.4 221.9, 340.3 218.6\nQ 343.2 215.4, 348.6 215.4\nQ 354.0 215.4, 356.9 218.6\nQ 359.8 221.9, 359.8 227.8\nQ 359.8 233.7, 356.9 237.1\nQ 353.9 240.4, 348.6 240.4\nQ 343.2 240.4, 340.3 237.1\nQ 337.4 233.7, 337.4 227.8\nM 348.6 237.7\nQ 352.3 237.7, 354.3 235.2\nQ 356.4 232.7, 356.4 227.8\nQ 356.4 223.0, 354.3 220.6\nQ 352.3 218.1, 348.6 218.1\nQ 344.9 218.1, 342.8 220.5\nQ 340.8 222.9, 340.8 227.8\nQ 340.8 232.7, 342.8 235.2\nQ 344.9 237.7, 348.6 237.7\n' fill='#FF0000'/>\n<path  class='atom-5' d='M 362.7 215.6\nL 366.0 215.6\nL 366.0 226.0\nL 378.5 226.0\nL 378.5 215.6\nL 381.8 215.6\nL 381.8 240.0\nL 378.5 240.0\nL 378.5 228.8\nL 366.0 228.8\nL 366.0 240.0\nL 362.7 240.0\nL 362.7 215.6\n' fill='#FF0000'/>\n</svg>\n", matches: [{ atom_indices: [1], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [2], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [4], trivial_name: { name: 'Alcohol', smarts: '[#6$([#6]-[O;H1])]', group: 'overshadowed' } }, { atom_indices: [0, 1, 2, 3], trivial_name: { name: 'Glycol', smarts: '[#6](-[O$([O;H1]),$(O-[#6])])-[#6]-[O$([O;H1]),$(O-[#6])]', group: 'functional_group' } }, { atom_indices: [2, 3, 4, 5], trivial_name: { name: 'Glycol', smarts: '[#6](-[O$([O;H1]),$(O-[#6])])-[#6]-[O$([O;H1]),$(O-[#6])]', group: 'functional_group' } }] }]
  it('should return the path bounding box', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `
<path class='atom-0' d='M 85.0 276.0
Q 85.0 271.1, 87.4 268.4
Q 89.8 265.6, 94.4 265.6
Q 98.9 265.6, 101.4 268.4
Q 103.8 271.1, 103.8 276.0
Q 103.8 281.0, 101.3 283.9
Q 98.9 286.7, 94.4 286.7
Q 89.9 286.7, 87.4 283.9
Q 85.0 281.1, 85.0 276.0
M 94.4 284.4
Q 97.5 284.4, 99.2 282.3
Q 100.9 280.2, 100.9 276.0
Q 100.9 272.0, 99.2 270.0
Q 97.5 267.9, 94.4 267.9
Q 91.3 267.9, 89.5 270.0
Q 87.9 272.0, 87.9 276.0
Q 87.9 280.2, 89.5 282.3
Q 91.3 284.4, 94.4 284.4
' fill='#FF0000'/>`
    const pathElement = testElement.getElementsByTagName('path')[0]
    const [[xMin, yMin], [xMax, yMax]] = getPathBounds(pathElement)
    chai.expect(xMin).to.equal(85)
    chai.expect(yMin).to.equal(265.6)
    chai.expect(xMax).to.equal(103.8)
    chai.expect(yMax).to.equal(286.7)
    testElement.remove()
  })

  it('should return the common beginning/end point of multiple paths', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)

    testElement.innerHTML = `
<path class="bond-0 atom-0 atom-1" d="M 124.8,270.8 L 94.2,253.1" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">
<path class="bond-0 atom-0 atom-1" d="M 94.2,253.1 L 63.5,235.4" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">
<path class="bond-1 atom-0 atom-2" d="M 124.8,270.8 L 199.4,227.7" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">`
    let paths = testElement.getElementsByTagName('path')
    let commonPoint = getAtomPositionFromBonds('atom-0', paths)
    chai.expect(commonPoint).to.eql([124.8, 270.8])

    testElement.innerHTML = `
<path class="bond-0 atom-0 atom-1" d="M 124.8,270.8 L 94.2,253.1" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">
<path class="bond-0 atom-0 atom-1" d="M 94.2,253.1 L 63.5,235.4" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">
<path class="bond-1 atom-0 atom-2" d="M 124.8,270.8 L 94.2,253.1" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">
<path class="bond-1 atom-0 atom-2" d="M 94.2,253.1 L 63.5,235.4" style="fill:none;fill-rule:even…:miter;stroke-opacity:1">`
    paths = testElement.getElementsByTagName('path')
    commonPoint = getAtomPositionFromBonds('atom-0', paths)
    chai.expect(commonPoint).to.eql([124.8, 270.8])

    testElement.remove()
  })

  it('should return the common beginning/end point of multiple paths', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
  })

  it('should highlight atom indexes', () => {
    const testElement = document.createElement('div')
    testElement.id = 'svg-test'
    document.body.appendChild(testElement)
    response.forEach((molecule) => {
      testElement.innerHTML = molecule.svg
      const svgElement = testElement.getElementsByTagName('svg')[0]
      const atomIndexes = molecule.matches[0].atom_indices
      highlightSubstructure(svgElement, atomIndexes)

      const [atoms, bonds] = getSubstructureElements(svgElement, atomIndexes)
      let substructureCount = 0
      for (const value of atoms.values()) {
        substructureCount += value.length
      }
      for (const value of bonds.values()) {
        substructureCount += value.length
      }

      const highlights = svgElement.getElementsByClassName('substructure-highlight')
      chai.expect(highlights.length).to.equal(substructureCount)
    })

    testElement.remove()
  })

  it('should get the position furthest from the other atom', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)

    testElement.innerHTML = `
    <path class="bond-0 atom-1 atom-0" d="M 71.9,110.0 L 72.2,109.6" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"></path>
    <path class="bond-0 atom-1 atom-0" d="M 68.7,108.6 L 69.2,107.7" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"></path>
    <path class="bond-0 atom-1 atom-0" d="M 65.4,107.2 L 66.1,105.8" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"></path>
    <path class="bond-0 atom-1 atom-0" d="M 42.6,97.3 L 45.0,92.6" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"></path>`
    const containingElements = testElement.querySelectorAll('.atom-0')
    const otherAtomPosition = [75.2, 111.4]
    const atomPosition = getFurthestFromOtherAtom('atom-0', otherAtomPosition, containingElements)
    chai.expect(atomPosition).to.eql([ 43.8, 94.94999999999999 ])
  })

  it('should calculate the euclidean distance', () => {
    const distance = getDistance([0, 0], [1, 1])
    chai.expect(Math.abs(distance - 1.4142135623730951) < 0.0000001)
  })

  it('should extract all path positions', () => {
    const testElement = document.createElement('svg')
    document.body.appendChild(testElement)
    testElement.innerHTML = `<path class="bond-3 atom-3 atom-4" d="M 130.9,200.5 L 63.5,340.3 L 43.4,328.7 Z" style="fill:#000000;fill-rule:evenodd;fill-opacity:1;stroke:#000000;stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;"></path>`
    const positions = getPathPositions(testElement.children[0])
    chai.expect(positions.length).to.equal(3)
  })
})
