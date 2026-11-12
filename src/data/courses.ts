import { curso1 } from './curso1-contabilidad'
import { curso2 } from './curso2-iva'

export const courses = [curso1, curso2]

export const getCourse = (id: string) => courses.find((c) => c.id === id)

export function findLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId)
  if (!course) return undefined
  const flat = course.modules.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })))
  const idx = flat.findIndex((x) => x.lesson.id === lessonId)
  if (idx < 0) return undefined
  return { course, ...flat[idx], prev: flat[idx - 1]?.lesson, next: flat[idx + 1]?.lesson }
}
