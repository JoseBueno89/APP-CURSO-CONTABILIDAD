import type { RedFlag } from '../types'
import { modelos } from './modelos'

const base: RedFlag[] = [
  { title: 'Cuentas no depositadas', detail: 'La sociedad no deposita cuentas anuales en el Registro Mercantil durante varios ejercicios, pero sigue operando y facturando.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 1' },
  { title: 'Efectivo desproporcionado', detail: 'Saldo en la cuenta 570 (Caja) muy elevado respecto a las ventas o la naturaleza del negocio.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 4' },
  { title: 'Movimientos con socios sin soporte', detail: 'Cargos y abonos recurrentes en la cuenta 551 por importes redondos, sin contrato ni acuerdo de la junta.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 3' },
  { title: 'Ventas B2B cobradas en efectivo', detail: 'Ventas a otras empresas por importes elevados cobradas en caja: posible introducción de fondos como ventas ficticias.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 3' },
  { title: 'Pérdidas continuadas sin cierre', detail: 'Patrimonio neto negativo durante años y la sociedad sigue operando: alguien la financia. ¿Quién y con qué fondos?', area: 'Contabilidad', severity: 'media', source: 'C1 · Módulo 4' },
  { title: 'Préstamos de socios sin intereses ni plazo', detail: 'Deudas a largo plazo con socios o terceros vinculados sin contrato, sin intereses y que nunca se devuelven: posible aportación encubierta.', area: 'Contabilidad', severity: 'media', source: 'C1 · Módulo 4' },
  { title: 'Cambios frecuentes de auditor o domicilio', detail: 'Rotación de auditores, administradores o domicilio social en periodos cortos.', area: 'Contabilidad', severity: 'media', source: 'C1 · Módulo 1' },
  { title: 'Devoluciones de IVA recurrentes', detail: 'IVA soportado sistemáticamente superior al repercutido, sin inversiones que lo justifiquen.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 1' },
  { title: 'Sociedad recién creada con gran volumen', detail: 'Sociedades de reciente constitución que facturan volúmenes muy elevados desde el primer trimestre sin estructura (empleados, local, almacén).', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 1' },
  { title: 'Proveedores que no declaran', detail: 'Proveedores que no presentan el 303 o el 347, o que desaparecen tras pocos trimestres.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 1' },
  { title: 'Tipos o exenciones indebidas', detail: 'Aplicación de tipos reducidos o exenciones a operaciones que tributan al tipo general.', area: 'IVA', severity: 'media', source: 'C2 · Módulo 2' },
  { title: 'Márgenes extraordinarios', detail: 'Márgenes muy superiores al sector, o ventas que crecen sin aumento de compras ni personal: posibles ventas ficticias para introducir efectivo.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 5' },
  { title: 'Ampliación por compensación de créditos', detail: 'Conversión en capital de deudas con socios de origen no acreditado: fase de integración del dinero.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 6' },
  { title: 'Administrador con decenas de cargos', detail: 'Una misma persona figura como administradora de muchas sociedades sin relación: posible testaferro.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 7' },
  { title: 'Préstamos de sociedades extranjeras vinculadas (loan-back)', detail: 'Deudas con entidades del grupo en el extranjero, sin intereses ni calendario, que financian toda la actividad.', area: 'Contabilidad', severity: 'alta', source: 'C1 · Módulo 9' },
  { title: 'Barrido de cuentas sensibles a 31/12', detail: 'Las cuentas 551 o 570 se dejan a cero con asientos manuales al cierre del ejercicio.', area: 'Contabilidad', severity: 'media', source: 'C1 · Módulo 9' },
  { title: 'Facturas con IVA en sectores con ISP', detail: 'Operaciones de chatarra, oro, móviles u obras de rehabilitación facturadas con IVA en lugar de con inversión del sujeto pasivo.', area: 'IVA', severity: 'media', source: 'C2 · Módulo 3' },
  { title: 'Entregas intracomunitarias sin salida de la mercancía', detail: 'Ventas "a la UE" sin IVA con lugar de entrega en España, sin CMR o con NIF-IVA no válido en el VIES.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 4' },
  { title: 'Precios de comercio exterior fuera de mercado', detail: 'Sobre o infrafacturación de importaciones y exportaciones (TBML).', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 5' },
  { title: 'Proveedor con un único cliente', detail: 'La numeración de facturas del proveedor corresponde casi íntegramente a un solo cliente.', area: 'IVA', severity: 'media', source: 'C2 · Módulo 6' },
  { title: 'Facturero en módulos', detail: 'Proveedores en régimen simplificado que facturan importes muy por encima de su capacidad.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 7' },
  { title: 'Venta por debajo del precio de compra', detail: 'Una sociedad vende sistemáticamente por menos de lo que compra: firma de la trucha en un fraude carrusel.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 8' },
  { title: 'Retorno en efectivo tras el pago de una factura', detail: 'Transferencia al proveedor seguida de retiradas de efectivo por importe similar.', area: 'IVA', severity: 'alta', source: 'C2 · Módulo 9' },
]

const fromModelos: RedFlag[] = modelos.flatMap((m) =>
  (m.secciones ?? []).flatMap((s) =>
    s.filas.flatMap((f) =>
      f.casillas.flatMap((c) =>
        (c.redFlags ?? []).map((rf) => ({
          title: `Modelo ${m.numero} · Casilla ${c.n}`,
          detail: rf,
          area: 'Modelos' as const,
          severity: 'media' as const,
          source: `${c.label} (${f.concepto})`,
        })),
      ),
    ),
  ),
)

export const redFlags: RedFlag[] = [...base, ...fromModelos]
