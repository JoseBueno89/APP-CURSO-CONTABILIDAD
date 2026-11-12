import type { ModeloTributario } from '../../types'
import { modelo303, compute303 } from './m303'
import { modelo390, compute390 } from './m390'
import { modelo349 } from './m349'
import { modelo347, compute347 } from './m347'

const pendiente = (
  numero: string,
  nombre: string,
  impuesto: string,
  periodicidad: string,
  quien: string,
  descripcion: string,
): ModeloTributario => ({ id: numero.replace(/\s|\//g, '-'), numero, nombre, impuesto, periodicidad, quien, descripcion, disponible: false })

export const modelos: ModeloTributario[] = [
  pendiente('036 / 037', 'Declaración censal', 'Censos', 'Al iniciar, modificar o cesar una actividad', 'Todo empresario o profesional',
    'La "partida de nacimiento" fiscal de una empresa: actividad, domicilio, administradores e impuestos a los que se da de alta. Clave para detectar cambios de administrador y de domicilio.'),
  modelo303,
  modelo390,
  modelo349,
  modelo347,
  pendiente('200', 'Impuesto sobre Sociedades', 'IS', 'Anual (julio)', 'Sociedades',
    'Declaración del beneficio de la sociedad. Incluye el balance y la cuenta de resultados, además de los socios y participaciones.'),
  pendiente('100', 'IRPF. Declaración de la Renta', 'IRPF', 'Anual (abril-junio)', 'Personas físicas',
    'Ingresos y patrimonio de las personas. Contrastarla con su nivel de vida es la base de muchas investigaciones patrimoniales.'),
  pendiente('111 / 190', 'Retenciones del trabajo y profesionales', 'IRPF', '111 trimestral / 190 anual', 'Quien paga nóminas o facturas de profesionales',
    'Revela si una empresa tiene empleados reales y a quién paga. Una sociedad sin 111 no tiene trabajadores declarados.'),
  pendiente('115 / 180', 'Retenciones por arrendamientos', 'IRPF / IS', '115 trimestral / 180 anual', 'Quien alquila locales a otros',
    'Muestra si la empresa paga un alquiler de local y a quién. Ayuda a verificar si tiene una sede real.'),
  pendiente('130', 'Pago fraccionado IRPF (autónomos)', 'IRPF', 'Trimestral', 'Autónomos en estimación directa',
    'Adelanto trimestral del IRPF de los autónomos. Permite seguir la evolución de sus ingresos.'),
  pendiente('720 / 721', 'Bienes en el extranjero / criptomonedas', 'Informativa', 'Anual (marzo)', 'Residentes con bienes o criptomonedas en el extranjero > 50.000 €',
    'Cuentas, valores, inmuebles y criptomonedas fuera de España. Herramienta clave en investigaciones patrimoniales.'),
]

export const computeFns: Record<string, (v: Record<string, number>) => Record<string, number>> = {
  '303': compute303,
  '390': compute390,
  '347': compute347,
}

export const getModelo = (id: string) => modelos.find((m) => m.id === id)
