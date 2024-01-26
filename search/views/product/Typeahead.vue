<template>
  <div class="py-6">
    <div class="container">
      <h1>Typeahead Test 1</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="input-group mb-3 d-flex">
            <!-- <input type="text" class="form-control" placeholder="キーワード、クリエイター、素材・コードで検索">
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button">
                <i class="fas fa-search"></i>
              </button>
            </div>-->
            <!-- <vue-bootstrap-typeahead
              class="flex-fill"
              :data="data"
              placeholder="Try searching for countries"
              backgroundVariant="white"
            /> -->
            <div class="input-group-append">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Dropdown</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
              <button class="btn btn-secondary" type="button">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

export default {
  data() {
    return {
      data: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua &amp; Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia &amp; Herzegovina',
        'Botswana',
        'Brazil',
        'British Virgin Islands',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cape Verde',
        'Cayman Islands',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Cote D Ivoire',
        'Croatia',
        'Cruise Ship',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Polynesia',
        'French West Indies',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kuwait',
        'Kyrgyz Republic',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Namibia',
        'Nepal',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Norway',
        'Oman',
        'Pakistan',
        'Palestine',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Pierre &amp; Miquelon',
        'Samoa',
        'San Marino',
        'Satellite',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'South Africa',
        'South Korea',
        'Spain',
        'Sri Lanka',
        'St Kitts &amp; Nevis',
        'St Lucia',
        'St Vincent',
        'St. Lucia',
        'Sudan',
        'Suriname',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        "Timor L'Este",
        'Togo',
        'Tonga',
        'Trinidad &amp; Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks &amp; Caicos',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'United States Minor Outlying Islands',
        'Uruguay',
        'Uzbekistan',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (US)',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ],
    };
  },
  components: {
    // VueBootstrapTypeahead,
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "src/assets/scss/bootstrap-custom/variables";
</style>
