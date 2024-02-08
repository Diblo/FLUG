const langDA = {
  add: "Tilføj",
  delete: "Slet",
  change: "Skift",

  admin: "Admin",
  adminHeader: "Administration",

  frontend: "Forsiden",

  users: "Bruger",
  userAdministrationHeader: "Brugeradministration",
  createUserHeader: "Opret en ny bruger",
  editUserHeader: "Rediger bruger",
  noUsers: "Ingen bruger",

  blogs: "Blog",
  blogAdministrationHeader: "Blogadministration",
  createBlogHeader: "Opret en ny blog",
  editBlogHeader: "Rediger blog",
  noBlogs: "Ingen blog",

  events: "Arrangementer",
  eventAdministrationHeader: "Arrangementadministration",
  createEventHeader: "Opret et nyt arrangement",
  editEventHeader: "Rediger arrangement",
  noEvents: "Ingen arrangementer",

  name: "Navn",
  firstName: "Fornavn",
  lastName: "Efternavn",
  email: "E-mail",
  createdAt: "Oprettet",
  updatedAt: "Opdateret",
  loggedInAt: "Logget ind",
  title: "Title",
  slug: "SLUG",
  shortDesc: "Kort beskrivelse",
  image: "Billede",
  content: "Indhold",
  start: "Start",
  end: "Slut",
  location: "Sted",
  desc: "Beskrivelse",

  errorFieldRequired: "Feltet er påkrævet", // 0 = Field label. E.g E-mail, Title etc.
  errorLengthMustBe: "Skal være {0} tegn", // 0 = min
  errorLengthBetween: "Skal være mellem {0} og {1} tegn", // 0 = min, 1 = max
  errorLengthMinimum: "Skal være mindst {0} tegn", // 0 = min
  errorLengthMaximum: "Må højst være {0} tegn", // 0 = max
  errorEqualTo: "Skal være det samme som {0}", // 0 = Field label. E.g E-mail, Title etc.
  errorGreaterThanDateTime: "Skal være en dato eller tid efter {0}", // 0 = Field label. E.g E-mail, Title etc.
  errorInvalidEmail: "E-mailen er ugyldig",
  errorInvalidSLUG:
    "SLUG'en kan kun indeholde bogstaverne a-z, tal fra 0-9 og bindestreg (-), og den må ikke begynde eller slutte med en bindestreg (-)",
    errorInvalidFile: "Filtype understøttes ikke",
    errorInvalidDateFormat: "Datoformatet er ugyldigt",
};

/**
 * @param {string} id
 * @param {boolean} [plural = false]
 * @param {string|number|Array} [args=[]]
 * @returns {string}
 */
export default function getText(id, plural = false, args = []) {
  let string = langDA[id];

  if (string) {
    if (Array.isArray(args)) {
      args.forEach((arg, index) => {
        string = string.replace(`{${index}}`, arg);
      });
    } else {
      string = string.replace("{0}", args);
    }
  }

  return string;
}
