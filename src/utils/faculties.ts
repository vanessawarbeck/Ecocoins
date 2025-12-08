export interface Faculty {
  id: string;
  nameDe: string;
  nameEn: string;
}

export const FACULTIES: Faculty[] = [
  {
    id: "architecture",
    nameDe: "Fakultät 01 für Architektur",
    nameEn: "Faculty 01 of Architecture",
  },
  {
    id: "civil-engineering",
    nameDe: "Fakultät 02 für Bauingenieurwesen",
    nameEn: "Faculty 02 of Civil Engineering",
  },
  {
    id: "mechanical-engineering",
    nameDe: "Fakultät 03 für Maschinenbau, Fahrzeugtechnik, Flugzeugtechnik",
    nameEn: "Faculty 03 of Mechanical, Automotive and Aeronautical Engineering",
  },
  {
    id: "electrical-engineering",
    nameDe: "Fakultät 04 für Elektrotechnik und Informationstechnik",
    nameEn: "Faculty 04 of Electrical Engineering and Information Technology",
  },
  {
    id: "engineering-systems",
    nameDe: "Fakultät 05 für Technische Systeme, Prozesse und Kommunikation",
    nameEn: "Faculty 05 of Engineering Systems, Processes and Communication",
  },
  {
    id: "applied-sciences",
    nameDe: "Fakultät 06 für angewandte Naturwissenschaften und Mechatronik",
    nameEn: "Faculty 06 of Applied Sciences and Mechatronics",
  },
  {
    id: "computer-science",
    nameDe: "Fakultät 07 für Informatik und Mathematik",
    nameEn: "Faculty 07 of Computer Science and Mathematics",
  },
  {
    id: "geoinformation",
    nameDe: "Fakultät 08 für Geoinformation",
    nameEn: "Faculty 08 of Geoinformation",
  },
  {
    id: "industrial-engineering",
    nameDe: "Fakultät 09 für Wirtschaftsingenieurwesen",
    nameEn: "Faculty 09 of Industrial Engineering",
  },
  {
    id: "business-school",
    nameDe: "Fakultät 10 – HM Business School (Betriebswirtschaft)",
    nameEn: "Faculty 10 – HM Business School (Business Administration)",
  },
  {
    id: "social-sciences",
    nameDe: "Fakultät 11 für angewandte Sozialwissenschaften",
    nameEn: "Faculty 11 of Applied Social Sciences",
  },
  {
    id: "design",
    nameDe: "Fakultät 12 für Design",
    nameEn: "Faculty 12 of Design",
  },
  {
    id: "general-studies",
    nameDe: "Fakultät 13 für Studium Generale und interdisziplinäre Studien",
    nameEn: "Faculty 13 of General and Interdisciplinary Studies",
  },
  {
    id: "tourism",
    nameDe: "Fakultät 14 für Tourismus",
    nameEn: "Faculty 14 of Tourism",
  },
  {
    id: "muc-dai",
    nameDe: "MUC.DAI – Munich Center for Digital Sciences & AI",
    nameEn: "MUC.DAI – Munich Center for Digital Sciences & AI",
  },
  {
    id: "muc-health",
    nameDe: "MUC.HEALTH – Munich Campus for Health and Engineering",
    nameEn: "MUC.HEALTH – Munich Campus for Health and Engineering",
  },
];

export function getFacultyName(facultyId: string, language: "de" | "en"): string {
  const faculty = FACULTIES.find((f) => f.id === facultyId);
  if (!faculty) return "";
  return language === "de" ? faculty.nameDe : faculty.nameEn;
}