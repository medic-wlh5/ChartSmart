import React, { Component } from 'react'
import './Calender.css'
import PatNav from '../Patient/PatNav/PatNav'

export default class Calender extends Component {
    render() {
        return (
            <div className='cal_page' >
            <PatNav/>
                <div class="jzdbox1 jzdbasf jzdcal">

<div class="jzdcalt">July 2019</div>

<span>Su</span>
<span>Mo</span>
<span>Tu</span>
<span>We</span>
<span>Th</span>
<span>Fr</span>
<span>Sa</span>


<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span>1</span>
<span class="date_circle" data-title="Apointment with Dr. Driscoll at 2pm">2</span>
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
<span>10</span>
<span>11</span>
<span class="date_circle" data-title="Apointment with Dr. Driscoll at 4:30pm">12</span>
<span>13</span>
<span>14</span>
<span>15</span>
<span>16</span>
<span>17</span>
<span>18</span>
<span>19</span>
<span>20</span>
<span>21</span>
<span class="date_circle" data-title="Apointment with Dr. Driscoll at 12pm">22</span>
<span>23</span>
<span>24</span>
<span>25</span>
<span>26</span>
<span>27</span>
<span>28</span>
<span>29</span>
<span>30</span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
<span class="jzdb"></span>
</div>
            </div>
        )
    }
}
