"use client";

import { useId, useState } from "react";
import {
  trainingDisciplineOrder,
  trainingDisciplines,
  trainingScenarios,
  type TrainingDiscipline,
  type TrainingScenarioId,
} from "@/data/training-week";
import "./training-calendar.css";

function DisciplineIcon({ discipline }: { discipline: TrainingDiscipline }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="tc-icon"
    >
      {discipline === "swim" && (
        <>
          <circle cx="20" cy="9" r="2.4" />
          <path d="m6 15 7-5 5 4m-5-4-3-5 7-2M3 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 5 0M3 24c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 5 0" />
        </>
      )}
      {discipline === "bike" && (
        <>
          <circle cx="7" cy="20" r="5" />
          <circle cx="22" cy="20" r="5" />
          <path d="m7 20 5-10 6 10H7m5-10h8l2 10M10 6h5m4-2h3l-2 6" />
        </>
      )}
      {discipline === "run" && (
        <>
          <circle cx="18" cy="5" r="2.6" />
          <path d="m8 13 5-4 5 5 5 1m-10-6-3 8 6 3-3 6m-3-9-4 5H2" />
        </>
      )}
      {discipline === "strength" && (
        <path d="M8 14h12M5 9v10m3-13v16m12-16v16m3-13v10M3 14h2m18 0h2" />
      )}
      {discipline === "recovery" && (
        <path d="M21 20A10 10 0 0 1 9 5a10 10 0 1 0 12 15Z" />
      )}
    </svg>
  );
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours ? `${hours} h` : ""}${remaining ? `${hours ? " " : ""}${remaining} min` : ""}`;
}

export function TrainingCalendar({ className = "" }: { className?: string }) {
  const [scenarioId, setScenarioId] = useState<TrainingScenarioId>("standard");
  const [selectedId, setSelectedId] = useState(
    trainingScenarios.standard.week[0].sessions[0].id,
  );
  const titleId = useId();
  const detailId = useId();
  const weekId = useId();
  const scenario = trainingScenarios[scenarioId];
  const week = scenario.week;
  const selectedDay =
    week.find((day) =>
      day.sessions.some((session) => session.id === selectedId),
    ) ?? week[0];
  const selected =
    selectedDay.sessions.find((session) => session.id === selectedId) ??
    selectedDay.sessions[0];
  const metadata = trainingDisciplines[selected.discipline];
  const sessions = week.flatMap((day) => day.sessions);
  const totalMinutes = sessions.reduce(
    (total, session) => total + session.minutes,
    0,
  );
  const minutesByDiscipline = trainingDisciplineOrder
    .filter((discipline) => discipline !== "recovery")
    .map((discipline) => ({
      discipline,
      minutes: sessions
        .filter((session) => session.discipline === discipline)
        .reduce((total, session) => total + session.minutes, 0),
    }));

  function selectScenario(next: TrainingScenarioId) {
    setScenarioId(next);
    const nextWeek = trainingScenarios[next].week;
    if (
      !nextWeek.some((day) =>
        day.sessions.some((session) => session.id === selectedId),
      )
    )
      setSelectedId(nextWeek[0].sessions[0].id);
  }

  return (
    <section
      className={`training-calendar ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <header className="tc-header">
        <div>
          <p className="tc-eyebrow">TU PLAN POR DENTRO / TRIATLÓN</p>
          <h3 id={titleId} className="tc-title">
            Cada sesión tiene un lugar.
          </h3>
        </div>
        <span className="tc-example-stamp">SEMANA ORIENTATIVA</span>
      </header>

      <div className="tc-availability">
        <p>¿Qué ocurre si esta semana tienes menos tiempo?</p>
        <div
          className="tc-scenarios"
          role="group"
          aria-label="Disponibilidad del ejemplo"
        >
          {(Object.keys(trainingScenarios) as TrainingScenarioId[]).map(
            (id) => (
              <button
                key={id}
                className="tc-scenario-button"
                type="button"
                aria-pressed={scenarioId === id}
                aria-controls={weekId}
                onClick={() => selectScenario(id)}
              >
                {trainingScenarios[id].label}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="tc-summary" aria-live="polite" aria-atomic="true">
        <div className="tc-total">
          <span>TIEMPO SEMANAL</span>
          <strong>{formatDuration(totalMinutes)}</strong>
          <small>{totalMinutes} minutos · 1 día de descanso</small>
        </div>
        <p>{scenario.explanation}</p>
      </div>

      <div className="tc-key" aria-label="Disciplinas del calendario">
        {trainingDisciplineOrder.map((discipline) => (
          <span key={discipline} className={`tc-key-item tc-${discipline}`}>
            <DisciplineIcon discipline={discipline} />
            {trainingDisciplines[discipline].label}
          </span>
        ))}
      </div>

      <div
        className="tc-week-viewport"
        tabIndex={0}
        role="region"
        aria-label="Calendario de lunes a domingo. Desplaza horizontalmente para ver todos los días."
      >
        <div id={weekId} className="tc-week">
          {week.map((day) => (
            <div
              key={day.day}
              className="tc-day"
              role="group"
              aria-label={day.day}
            >
              <div className="tc-day-heading" aria-hidden="true">
                <strong>{day.shortDay}</strong>
                <span>
                  {day.sessions.reduce(
                    (total, session) => total + session.minutes,
                    0,
                  ) || "—"}
                  {day.sessions.some((session) => session.minutes > 0) &&
                    " min"}
                </span>
              </div>
              <div className="tc-day-sessions">
                {day.sessions.map((session) => (
                  <button
                    key={session.id}
                    type="button"
                    className={`tc-session tc-${session.discipline}`}
                    aria-pressed={selected.id === session.id}
                    aria-controls={detailId}
                    onClick={() => setSelectedId(session.id)}
                  >
                    <span className="visually-hidden">
                      {`${day.day}: ${trainingDisciplines[session.discipline].label}. `}
                    </span>
                    <span className="tc-session-sport">
                      <DisciplineIcon discipline={session.discipline} />
                      <span>
                        {trainingDisciplines[session.discipline].shortLabel}
                      </span>
                    </span>
                    <span className="tc-session-duration">
                      {session.minutes ? (
                        <>
                          {session.minutes}
                          <small>min</small>
                        </>
                      ) : (
                        <span aria-hidden="true">—</span>
                      )}
                    </span>
                    <span className="tc-session-name">{session.title}</span>
                    <span className="tc-session-more">
                      Ver sesión
                      <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M3 9 9 3M3 3h6v6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="tc-select-hint">
        Selecciona un entreno para ver su propósito.{" "}
        <span>Desliza para recorrer la semana →</span>
      </p>

      <div
        id={detailId}
        className="tc-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="tc-detail-description">
          <div className="tc-detail-meta">
            <span className={`tc-detail-discipline tc-${selected.discipline}`}>
              <DisciplineIcon discipline={selected.discipline} />
              {metadata.label}
            </span>
            <span>
              {selectedDay.day}
              {selected.minutes ? ` · ${selected.minutes} min` : ""}
            </span>
          </div>
          <h4>{selected.title}</h4>
          <p>{selected.objective}</p>
          <dl className="tc-session-reasoning">
            <div>
              <dt>Intensidad prevista</dt>
              <dd>{selected.intensity}</dd>
            </div>
            <div>
              <dt>Por qué este día</dt>
              <dd>{selected.whyThisDay}</dd>
            </div>
            <div>
              <dt>Adaptación que buscamos</dt>
              <dd>{selected.adaptation}</dd>
            </div>
          </dl>
        </div>
        <div className="tc-structure">
          <p className="tc-structure-label">ESTRUCTURA ORIENTATIVA</p>
          {selected.structure.length ? (
            <>
              <div
                className={`tc-structure-bar tc-${selected.discipline}`}
                aria-hidden="true"
              >
                {selected.structure.map((part) => (
                  <span key={part.label} style={{ flexGrow: part.minutes }} />
                ))}
              </div>
              <ol>
                {selected.structure.map((part) => (
                  <li key={part.label}>
                    <span>{part.label}</span>
                    <strong>{part.minutes} min</strong>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="tc-recovery-note">
              El descanso también tiene su espacio en el calendario.
            </p>
          )}
        </div>
      </div>

      <div className="tc-decisions">
        <p className="tc-structure-label">EL CRITERIO DETRÁS DE ESTA SEMANA</p>
        <ol>
          {scenario.decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ol>
      </div>

      <div className="tc-time-distribution">
        <p className="tc-structure-label">DISTRIBUCIÓN DEL TIEMPO</p>
        <div className="tc-time-bar" aria-hidden="true">
          {minutesByDiscipline.map(({ discipline, minutes }) => (
            <span
              key={discipline}
              className={`tc-${discipline}`}
              style={{ flexGrow: minutes }}
            />
          ))}
        </div>
        <ul>
          {minutesByDiscipline.map(({ discipline, minutes }) => (
            <li key={discipline} className={`tc-${discipline}`}>
              <span>{trainingDisciplines[discipline].label}</span>
              <strong>{minutes} min</strong>
            </li>
          ))}
        </ul>
        <p>
          El tiempo no equivale a la carga: también importan la intensidad, el
          impacto y la recuperación.
        </p>
      </div>

      <p className="tc-example-note">
        Ejemplo ilustrativo, no un plan individual ni un generador automático.
        Dos semanas posibles para un atleta habituado a estas disciplinas: tu
        entrenador decide las prioridades según tu perfil, tu objetivo y tu
        respuesta. El trabajo de fuerza se organiza junto al de resistencia; las
        sesiones compatibles se pueden consultar en TrainingPeaks.
      </p>
    </section>
  );
}
