import moment, { Moment } from 'moment-timezone';
import { Polygon } from 'geojson';

import { Title, Description, Status, StatusType } from './entities';

type Target = 'road' | 'map' | 'poi';
type Level = 'expert' | 'intermediate' | 'beginner';
type Priority = 'high' | 'normal' | 'low';

export class Task {
  private _id: string | null;
  private _no: number | null;
  private _title: Title;
  private _description: Description;
  private _detail: string;
  private _area: Polygon | null;
  private _status: Status;
  private _workflowId: string;
  private _target: Target[];
  private _level: Level;
  private _priority: Priority;
  private _previous: string[];
  private _next: string[];
  private _createUserId: string;
  private _assignedUserIds: string[];
  private _createdAt: moment.Moment;

  constructor(
    title: string,
    description: string,
    workflowId: string,
    priority: 'high' | 'normal' | 'low',
    target: ('road' | 'map' | 'poi')[],
    level: 'expert' | 'intermediate' | 'beginner',
    createUserId: string,
    detail: string = '',
    area: Polygon | null = null,
    previous: string[] = [],
    next: string[] = [],
    assignedUserIds: string[] = [],
    id: string | null = null,
    no: number | null = null
  ) {
    this._id = id;
    this._no = no;
    this._title = new Title(title);
    this._description = new Description(description);
    this._detail = detail;
    this._workflowId = workflowId;
    this._target = target;
    this._level = level;
    this._priority = priority;
    this._createUserId = createUserId;
    this._detail = detail;
    this._area = area;
    this._previous = previous;
    this._next = next;
    this._assignedUserIds = assignedUserIds;
    this._status = new Status('unassigned');
    this._createdAt = moment(new Date());
  }

  get id(): string | null {
    return this._id;
  }

  set id(id: string | null) {
    if (id) this._id = id;
  }

  get no(): number | null {
    return this._no;
  }

  set no(no: number | null) {
    if (no) this._no = no;
  }

  get title(): string {
    return this._title.get();
  }

  get description(): string {
    return this._description.get();
  }

  get detail(): string {
    return this._detail;
  }

  get area(): Polygon | null {
    return this._area;
  }

  get status(): StatusType {
    return this._status.get();
  }

  get workflowId(): string {
    return this._workflowId;
  }

  get target(): Target[] {
    return this._target;
  }

  get level(): Level {
    return this._level;
  }

  get priority(): Priority {
    return this._priority;
  }

  get previous(): string[] {
    return this._previous;
  }

  get next(): string[] {
    return this._next;
  }

  get assinedUserIds(): string[] {
    return this._assignedUserIds;
  }

  get createdUserId(): string {
    return this._createUserId;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }
}
